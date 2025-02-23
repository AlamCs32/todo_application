import { cn } from '@/lib/utils'
import React from 'react'
import { SheetContent, SheetHeader, Sheet as SheetM, SheetTitle, SheetTrigger } from '../ui/sheet'

const Sheet = ({ open, setOpen, trigger, className, sheetTitle, content, form }) => {
    return (
        <>
            <SheetM open={open} onOpenChange={(e) => {
                setOpen(e);
                if (form) {
                    form.reset()
                }
            }}>
                <SheetTrigger asChild>
                    {/* <Button className="bg-blue-500">Add To-Do</Button> */}
                    {trigger}
                </SheetTrigger>

                <SheetContent side="right" className={cn("w-[500px] p-5", className)}>
                    <SheetHeader>
                        <SheetTitle>{sheetTitle}</SheetTitle>
                    </SheetHeader>
                    {content}
                    {/* <AddTodoFrom form={form} onSubmit={onSubmit} isLoading={isLoading} /> */}
                </SheetContent>
            </SheetM>
        </>
    )
}

export default Sheet