'use client'

import * as React from 'react'
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from 'lucide-react'
import { DayButton, DayPicker, getDefaultClassNames } from 'react-day-picker'

import { cn } from '@/lib/utils'
import Button, { buttonVariants } from '@/components/Button'

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  captionLayout = 'label',
  buttonVariant = 'ghost',
  formatters,
  components,
  availability = {},
  ...props
}: React.ComponentProps<typeof DayPicker> & {
  buttonVariant?: React.ComponentProps<typeof Button>['variant']
  availability?: Record<string, string[]>
}) {
  const defaultClassNames = getDefaultClassNames()

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn(
        'bg-[#2A2B45] text-white p-6 rounded-2xl border border-[#A09BD3] border-opacity-20',
        className,
      )}
      captionLayout={captionLayout}
      formatters={{
        formatMonthDropdown: (date) =>
          date.toLocaleString('default', { month: 'short' }),
        ...formatters,
      }}
      classNames={{
        root: cn('w-fit', defaultClassNames.root),
        months: cn(
          'flex gap-6 flex-col md:flex-row relative',
          defaultClassNames.months,
        ),
        month: cn('flex flex-col w-full gap-4', defaultClassNames.month),
        nav: cn(
          'flex items-center gap-2 w-full absolute top-0 inset-x-0 justify-between',
          defaultClassNames.nav,
        ),
        button_previous: cn(
          buttonVariants({ variant: 'outline' }),
          'size-10 hover:bg-[#6149E9] hover:text-white border-[#A09BD3] text-[#A09BD3]',
          defaultClassNames.button_previous,
        ),
        button_next: cn(
          buttonVariants({ variant: 'outline' }),
          'size-10 hover:bg-[#6149E9] hover:text-white border-[#A09BD3] text-[#A09BD3]',
          defaultClassNames.button_next,
        ),
        month_caption: cn(
          'flex items-center justify-center h-12 w-full text-white text-xl font-semibold',
          defaultClassNames.month_caption,
        ),
        dropdowns: cn(
          'w-full flex items-center text-lg font-medium justify-center h-12 gap-3',
          defaultClassNames.dropdowns,
        ),
        dropdown_root: cn(
          'relative border border-[#A09BD3] bg-[#1B1C31] text-white rounded-lg',
          defaultClassNames.dropdown_root,
        ),
        dropdown: cn(
          'absolute bg-[#2A2B45] border border-[#A09BD3] inset-0 opacity-0',
          defaultClassNames.dropdown,
        ),
        caption_label: cn(
          'select-none font-semibold text-white',
          captionLayout === 'label'
            ? 'text-lg'
            : 'rounded-lg pl-3 pr-2 flex items-center gap-2 text-lg h-10 [&>svg]:text-[#A09BD3] [&>svg]:size-4',
          defaultClassNames.caption_label,
        ),
        table: 'w-full border-collapse',
        weekdays: cn('flex', defaultClassNames.weekdays),
        weekday: cn(
          'text-[#A09BD3] rounded-lg flex-1 font-normal text-lg select-none py-3',
          defaultClassNames.weekday,
        ),
        week: cn('flex w-full mt-2', defaultClassNames.week),
        week_number_header: cn(
          'select-none w-12',
          defaultClassNames.week_number_header,
        ),
        week_number: cn(
          'text-lg select-none text-[#A09BD3]',
          defaultClassNames.week_number,
        ),
        day: cn(
          'relative w-full h-full p-0 text-center group/day aspect-square select-none',
          defaultClassNames.day,
        ),
        range_start: cn(
          'rounded-l-lg bg-[#6149E9]',
          defaultClassNames.range_start,
        ),
        range_middle: cn('rounded-none bg-[#6149E9] bg-opacity-50', defaultClassNames.range_middle),
        range_end: cn('rounded-r-lg bg-[#6149E9]', defaultClassNames.range_end),
        today: cn(
          'border-2 border-[#6149E9]',
          defaultClassNames.today,
        ),
        outside: cn(
          'text-[#A09BD3] text-opacity-50',
          defaultClassNames.outside,
        ),
        disabled: cn(
          'text-[#A09BD3] opacity-30',
          defaultClassNames.disabled,
        ),
        hidden: cn('invisible', defaultClassNames.hidden),
        ...classNames,
      }}
      components={{
        Root: ({ className, rootRef, ...props }) => {
          return (
            <div
              data-slot="calendar"
              ref={rootRef}
              className={cn(className)}
              {...props}
            />
          )
        },
        Chevron: ({ className, orientation, ...props }) => {
          if (orientation === 'left') {
            return (
              <ChevronLeftIcon className={cn('size-5 text-[#A09BD3]', className)} {...props} />
            )
          }

          if (orientation === 'right') {
            return (
              <ChevronRightIcon
                className={cn('size-5 text-[#A09BD3]', className)}
                {...props}
              />
            )
          }

          return (
            <ChevronDownIcon className={cn('size-5 text-[#A09BD3]', className)} {...props} />
          )
        },
        DayButton: (props) => <CalendarDayButton {...props} availability={availability} />,
        WeekNumber: ({ children, ...props }) => {
          return (
            <td {...props}>
              <div className="flex size-12 items-center justify-center text-center">
                {children}
              </div>
            </td>
          )
        },
        ...components,
      }}
      {...props}
    />
  )
}

function CalendarDayButton({
  className,
  day,
  modifiers,
  availability = {},
  ...props
}: React.ComponentProps<typeof DayButton> & {
  availability?: Record<string, string[]>
}) {
  const defaultClassNames = getDefaultClassNames()

  const ref = React.useRef<HTMLButtonElement>(null)
  React.useEffect(() => {
    if (modifiers.focused) ref.current?.focus()
  }, [modifiers.focused])

  const dateString = day.date.toISOString().split('T')[0]
  const slots = availability[dateString]
  const hasAvailability = slots && slots.length > 0

  const getAvailabilityClass = () => {
    if (!hasAvailability) return ''
    
    const slotCount = slots.length
    if (slotCount >= 3) return 'bg-green-500 text-white hover:bg-green-600'
    if (slotCount === 2) return 'bg-yellow-500 text-[#1B1C31] hover:bg-yellow-600'
    return 'bg-blue-500 text-white hover:bg-blue-600'
  }

  return (
    <Button
      ref={ref}
      variant="ghost"
      size="icon"
      data-day={dateString}
      data-selected-single={
        modifiers.selected &&
        !modifiers.range_start &&
        !modifiers.range_end &&
        !modifiers.range_middle
      }
      data-range-start={modifiers.range_start}
      data-range-end={modifiers.range_end}
      data-range-middle={modifiers.range_middle}
      data-has-availability={hasAvailability}
      title={hasAvailability ? `Disponible: ${slots.join(', ')}` : 'No disponible'}
      className={cn(
        'data-[selected-single=true]:bg-[#6149E9] data-[selected-single=true]:text-white',
        'data-[range-middle=true]:bg-[#6149E9] data-[range-middle=true]:text-white data-[range-middle=true]:bg-opacity-50',
        'data-[range-start=true]:bg-[#6149E9] data-[range-start=true]:text-white',
        'data-[range-end=true]:bg-[#6149E9] data-[range-end=true]:text-white',
        'group-data-[focused=true]/day:border-2 group-data-[focused=true]/day:border-[#6149E9]',
        'flex aspect-square size-auto w-full min-w-12 flex-col gap-1 leading-none font-normal',
        'data-[range-end=true]:rounded-lg data-[range-end=true]:rounded-r-lg',
        'data-[range-middle=true]:rounded-none',
        'data-[range-start=true]:rounded-lg data-[range-start=true]:rounded-l-lg',
        'hover:bg-[#6149E9] hover:text-white transition-all duration-200',
        getAvailabilityClass(),
        defaultClassNames.day,
        className,
      )}
      {...props}
    >
      <span className="text-sm font-medium">{day.date.getDate()}</span>
      {hasAvailability && (
        <div className="flex justify-center gap-0.5">
          {slots.slice(0, 3).map((_, index) => (
            <div
              key={index}
              className="w-1 h-1 rounded-full bg-current opacity-70"
            />
          ))}
        </div>
      )}
    </Button>
  )
}

export { Calendar, CalendarDayButton }