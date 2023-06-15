import React, { useState, useRef, useId } from 'react'
import { FloatingPortal, useFloating, arrow, shift, offset, Placement } from '@floating-ui/react'
import { motion, AnimatePresence } from 'framer-motion'

interface IPopoverProps {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  initialOpen?: boolean
  placement?: Placement
}

const Popover = (props: IPopoverProps) => {
  const { children, renderPopover, className, initialOpen, placement } = props
  const arrowRef = useRef<HTMLElement>(null)
  const [isOpen, setIsOpen] = useState(initialOpen ?? false)
  const floatingId = useId()
  const { x, y, refs, strategy, middlewareData } = useFloating({
    //strategy dinh nghia viec hien thi fixed hay absolute
    placement: placement,
    middleware: [
      offset(6),
      shift(),
      arrow({
        element: arrowRef
      })
    ]
  })

  const showPopover = () => {
    setIsOpen(true)
  }

  const hidePopover = () => {
    setIsOpen(false)
  }
  return (
    <>
      <div
        className={`${className} flex cursor-pointer items-center py-1 hover:text-gray-300`}
        ref={refs.setReference}
        onMouseEnter={showPopover}
        onMouseLeave={hidePopover}
      >
        {children}
        <FloatingPortal id={floatingId}>
          <AnimatePresence>
            {isOpen && (
              <motion.div
                ref={refs.setFloating}
                style={{
                  position: strategy,
                  top: y ?? 0,
                  left: x ?? 0,
                  width: 'max-content',
                  transformOrigin: `${middlewareData?.arrow?.x}px top`
                }}
                initial={{ opacity: 0, transform: 'scale(0)' }}
                animate={{ opacity: 1, transform: 'scale(1)' }}
                exit={{ opacity: 0, transform: 'scale(0)' }}
                transition={{ duration: 0.2 }}
              >
                <span
                  ref={arrowRef}
                  style={{
                    left: middlewareData?.arrow?.x,
                    top: middlewareData?.arrow?.y
                  }}
                  className='absolute z-[1] translate-y-[-95%] border-[11px] border-x-transparent border-b-white border-t-transparent'
                />
                {renderPopover}
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </div>
    </>
  )
}

export default Popover
