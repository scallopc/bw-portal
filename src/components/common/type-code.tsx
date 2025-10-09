"use client";
import { useEffect, useRef, useState } from 'react';

const codeSnippets = {
  'main.tsx': `import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import './styles.scss';

// Define app props interface
interface AppProps {
  title: string;
}

// Main App Component
const App: React.FC<AppProps> = ({ title }) => {
  return (
    <div className="app">
      <Hero title={title} />
    </div>
  );
};

// Create root and render
const root = ReactDOM.createRoot(
  document.getElementById('root')!
);

root.render(
  <App title="Building the Future" />
);`,

  'styles.scss': `@use 'variables' as *;

.app {
  min-height: 100vh;
  background: var(--gradient-dark);

  .hero {
    display: flex;
    align-items: center;
    padding: 4rem 2rem;

    &__title {
      font-size: 3.5rem;
      background: var(--gradient-text);
      -webkit-background-clip: text;
      color: transparent;
    }
  }
}`,

  'button.tsx': `import { FC, ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  ...props
}) => {
  return (
    <button
      className={\`btn btn--\${variant} btn--\${size}\`}
      {...props}
    >
      {children}
    </button>
  );
};`
};

interface Token {
  text: string;
  type: string;
}

const tokenize = (code: string, language: string): Token[] => {
  const tokens: Token[] = [];
  let remaining = code;

  const patterns = {
    tsx: [
      { type: 'comment', regex: /^\/\/.*/ },
      { type: 'keyword', regex: /^(import|export|const|let|var|from|interface|return|extends|type)\b/ },
      { type: 'string', regex: /^(['"\`])((?:\\.|(?!\1)[^\\])*)\1/ },
      { type: 'type', regex: /^(React\.FC|FC|string|HTMLButtonElement|ButtonHTMLAttributes)\b/ },
      { type: 'component', regex: /^<\/?\w+/ },
      { type: 'function', regex: /^(\w+)(?=\s*[\({\`])/ },
      { type: 'property', regex: /^(\w+)(?=\s*[=:])/ },
      { type: 'punctuation', regex: /^[{}()[\]=<>.,]/ },
      { type: 'operator', regex: /^[+\-*/%=?:|&]/ },
      { type: 'number', regex: /^\d+/ },
    ],
    scss: [
      // Comments
      { type: 'comment', regex: /^\/\/.*|^\/\*[\s\S]*?\*\// },
      // SCSS directives and special characters
      { type: 'keyword', regex: /^(@use|@import|@mixin|@include|@extend|@if|@else|@each|@for|@while)\b/ },
      // SCSS variables
      { type: 'variable', regex: /^(\$[\w-]+)/ },
      // CSS properties
      { type: 'property', regex: /^(display|align-items|justify-content|flex|grid|padding|margin|width|height|min-height|max-height|background|color|font-size|font-family|-webkit-background-clip|position|top|right|bottom|left|border|border-radius|opacity|transform|transition)\b(?=\s*:)/ },
      // CSS functions
      { type: 'function', regex: /^(var|calc|rgb|rgba|hsl|hsla|url|linear-gradient|radial-gradient)\b(?=\s*\()/ },
      // Strings
      { type: 'string', regex: /^(['"])[^'"]*\1/ },
      // Numbers with units
      { type: 'number', regex: /^(#[a-fA-F0-9]{3,8}|(?:\d*\.)?\d+(?:px|rem|em|vh|vw|%|s|ms)?)/ },
      // Selectors
      { type: 'component', regex: /^([.#][\w-]+|&(?:__)?[\w-]*|[\w-]+)(?=\s*{|\s*,|\s*:|\s*>|\s+(?=[.#]|\w+[,{]))/ },
      // Punctuation
      { type: 'punctuation', regex: /^[{}();:,]/ },
      // Important values
      { type: 'keyword', regex: /^(absolute|relative|fixed|flex|block|none|hidden|visible|transparent|inherit|initial)\b(?=\s*[;}])/ },
    ]
  };

  while (remaining) {
    let matched = false;
    const patternList = patterns[language as keyof typeof patterns] || patterns.tsx;

    // Handle whitespace
    const whitespace = /^(\s+)/.exec(remaining);
    if (whitespace) {
      tokens.push({ text: whitespace[0], type: 'whitespace' });
      remaining = remaining.slice(whitespace[0].length);
      continue;
    }

    for (const { type, regex } of patternList) {
      const match = regex.exec(remaining);
      if (match) {
        tokens.push({ text: match[0], type });
        remaining = remaining.slice(match[0].length);
        matched = true;
        break;
      }
    }

    if (!matched) {
      tokens.push({ text: remaining[0], type: 'text' });
      remaining = remaining.slice(1);
    }
  }

  return tokens;
};

export const TypeCode = () => {
  const [activeTab, setActiveTab] = useState('main.tsx');
  const [snippetStates, setSnippetStates] = useState<Record<string, string>>({
    'main.tsx': '',
    'styles.scss': '',
    'button.tsx': ''
  });

  const typeAllSnippets = async () => {
    const maxLength = Math.max(...Object.values(codeSnippets).map(code => code.length));
    
    for (let i = 0; i < maxLength; i++) {
      await new Promise(resolve => setTimeout(resolve, 50));
      
      setSnippetStates(prev => {
        const newState = { ...prev };
        Object.entries(codeSnippets).forEach(([key, code]) => {
          if (i < code.length) {
            newState[key] = code.slice(0, i + 1);
          }
        });
        return newState;
      });
    }
  };

  useEffect(() => {
    typeAllSnippets();
  }, []);

  const handleTabClick = (tab: string) => {
    if (tab === activeTab) return;
    setActiveTab(tab);
  };

  const renderCode = (code: string, language: string) => {
    const tokens = tokenize(code, language);
    return tokens.map((token, index) => (
      <span key={index} className={token.type}>
        {token.text}
      </span>
    ));
  };

  return (
    <div className="code-editor bg-slate-900 rounded-xl overflow-hidden shadow-2xl font-mono w-full max-w-2xl mx-auto">
      <div className="bg-slate-800/50 px-4 py-3 flex items-center gap-4 border-b border-slate-700">
        <div className="flex gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
        <div className="flex gap-1">
          {Object.keys(codeSnippets).map((tab) => (
            <div
              key={tab}
              className={`px-4 py-1 text-sm rounded cursor-pointer transition-all ${
                activeTab === tab 
                  ? 'bg-slate-700 text-white' 
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
              }`}
              onClick={() => handleTabClick(tab)}
            >
              {tab}
            </div>
          ))}
        </div>
      </div>
      <div className="p-6 flex gap-6 min-h-[300px] max-h-[400px] overflow-hidden">
        <div className="flex flex-col text-slate-500 text-sm select-none pr-4 border-r border-slate-700 leading-6">
          {snippetStates[activeTab].split('\n').map((_, i) => (
            <span key={i}>{i + 1}</span>
          ))}
        </div>
        <pre className="flex-1 m-0 p-0 bg-transparent border-none outline-none overflow-y-auto overflow-x-hidden whitespace-pre tab-size-2">
          <code className="block text-slate-100 text-sm leading-6 font-mono">
            {renderCode(
              snippetStates[activeTab],
              activeTab.endsWith('.tsx') ? 'tsx' : 'scss'
            )}
          </code>
        </pre>
      </div>
    </div>
  );
};
