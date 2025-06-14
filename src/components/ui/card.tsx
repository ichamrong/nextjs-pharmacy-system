import * as React from "react"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  bordered?: boolean
}

interface CardImageProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt: string
  aspectRatio?: "square" | "video" | "auto"
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, hoverable, bordered = true, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "rounded-lg bg-card text-card-foreground shadow-sm",
        bordered && "border border-border",
        hoverable && "transition-all duration-200 hover:shadow-md hover:border-primary/50",
        className
      )}
      {...props}
    />
  )
)
Card.displayName = "Card"

const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
))
CardHeader.displayName = "CardHeader"

const CardTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn(
      "text-2xl font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
))
CardTitle.displayName = "CardTitle"

const CardDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
))
CardDescription.displayName = "CardDescription"

const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
))
CardContent.displayName = "CardContent"

const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
))
CardFooter.displayName = "CardFooter"

const CardImage = React.forwardRef<HTMLDivElement, CardImageProps>(
  ({ className, src, alt, aspectRatio = "auto", ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative overflow-hidden",
        aspectRatio === "square" && "aspect-square",
        aspectRatio === "video" && "aspect-video",
        className
      )}
      {...props}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-300 hover:scale-105"
      />
    </div>
  )
)
CardImage.displayName = "CardImage"

export {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
  CardImage,
}
