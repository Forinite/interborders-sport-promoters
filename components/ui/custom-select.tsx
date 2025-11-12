// components/ui/custom-select.tsx
import * as React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import { Check, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

const CustomSelect = SelectPrimitive.Root;
const CustomSelectGroup = SelectPrimitive.Group;
const CustomSelectValue = SelectPrimitive.Value;

const CustomSelectTrigger = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Trigger
        ref={ref}
        className={cn(
            'flex h-14 w-full items-center justify-between rounded-xl bg-white px-5 py-3 text-base font-medium transition-all',
            'focus:outline-none focus:ring-4 focus:ring-[#0A84FF]/20',
            'disabled:cursor-not-allowed disabled:opacity-50',
            className
        )}
        {...props}
    >
        <div className="flex items-center gap-3">
            {children}
        </div>
        <ChevronDown className="h-5 w-5 text-[#64748B] transition-transform duration-300 data-[state=open]:rotate-180" />
    </SelectPrimitive.Trigger>
));
CustomSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

const CustomSelectContent = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Portal>
        <SelectPrimitive.Content
            ref={ref}
            className={cn(
                'relative z-50 min-w-[12rem] overflow-hidden rounded-xl border-2 border-[#CBD5E1] bg-white shadow-2xl',
                'data-[state=open]:animate-in data-[state=closed]:animate-out',
                'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
                'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
                className
            )}
            position="popper"
            sideOffset={8}
            {...props}
        >
            <SelectPrimitive.Viewport className="p-2">
                {children}
            </SelectPrimitive.Viewport>
        </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
));
CustomSelectContent.displayName = SelectPrimitive.Content.displayName;

const CustomSelectItem = React.forwardRef<
    React.ElementRef<typeof SelectPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
    <SelectPrimitive.Item
        ref={ref}
        className={cn(
            'relative flex w-full cursor-pointer select-none items-center rounded-lg px-4 py-3 text-base font-medium outline-none',
            'transition-colors hover:bg-[#0A84FF]/10 focus:bg-[#0A84FF]/10',
            'data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
            className
        )}
        {...props}
    >
    <span className="absolute right-4 flex h-5 w-5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-5 w-5 text-[#0A84FF]" />
      </SelectPrimitive.ItemIndicator>
    </span>
        <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
));
CustomSelectItem.displayName = SelectPrimitive.Item.displayName;

export {
    CustomSelect,
    CustomSelectTrigger,
    CustomSelectValue,
    CustomSelectContent,
    CustomSelectItem,
};