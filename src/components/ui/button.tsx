import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "cursor-pointer inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-oswald font-semibold transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-secondary/50 hover:scale-105 shadow-lg hover:shadow-xl",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-r from-primary via-primary/90 to-primary/80 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-primary-foreground border border-secondary/30 hover:border-secondary/50",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/80 hover:from-destructive/90 hover:to-destructive/70 text-white border border-destructive/30",
        outline:
          "border-2 border-foreground/20 text-foreground bg-transparent hover:border-foreground hover:bg-foreground/5 hover:text-foreground",
        secondary:
          "bg-gradient-to-r from-secondary to-secondary/80 hover:from-secondary/90 hover:to-secondary/70 text-primary border border-secondary/30",
        ghost:
          "text-foreground hover:bg-secondary/10 hover:text-secondary border border-transparent hover:border-secondary/20",
        link: "text-primary underline-offset-4 hover:underline hover:text-secondary bg-transparent shadow-none hover:shadow-none hover:scale-100",
      },
      size: {
        default: "px-6 py-3 text-sm",
        sm: "px-4 py-2 text-xs",
        lg: "px-8 py-4 text-base",
        xl: "px-10 py-5 text-lg",
        icon: "w-10 h-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
