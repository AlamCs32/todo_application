import React from 'react'
import { Button as ButtonM } from "../ui/button"
import { cn } from '@/lib/utils'
const Button = ({ type, className, children, ...restProps }) => {
    return (
        <ButtonM type="submit" className={cn(className)} {...restProps}>
            {children}
        </ButtonM>
    )
}

export default Button