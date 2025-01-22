import type React from 'react';
import { cn } from '../../../lib/utils';

export default function Button({
  className,
  ...props
}: React.ComponentProps<'button'>) {
  return (
    <button
      {...props}
      type={props.type}
      className={cn(
        'border-none focus:outline-none outline-none px-4 py-1.5 bg-neutral-100 focus:bg-neutral-200 w-full',
        className
      )}
    />
  );
}
