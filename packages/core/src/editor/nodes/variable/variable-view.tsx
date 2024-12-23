import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/editor/components/popover';
import { Divider } from '@/editor/components/ui/divider';
import { TooltipProvider } from '@/editor/components/ui/tooltip';
import {
  DEFAULT_RENDER_VARIABLE_FUNCTION,
  RenderVariableFunction,
  useMailyContext,
} from '@/editor/provider';
import { NodeViewProps } from '@tiptap/core';
import { NodeViewWrapper } from '@tiptap/react';
import { AlertTriangle, Braces, Pencil } from 'lucide-react';

export function VariableView(props: NodeViewProps) {
  const { node, updateAttributes, editor } = props;
  const { id, fallback, required } = node.attrs;

  const { renderVariable = DEFAULT_RENDER_VARIABLE_FUNCTION } =
    useMailyContext();

  return (
    <NodeViewWrapper
      className="react-component mly-inline-block mly-leading-none"
      draggable="false"
    >
      <Popover>
        <PopoverTrigger>
          {renderVariable({
            variable: { name: id, required: required },
            fallback,
            editor,
          })}
        </PopoverTrigger>
        <PopoverContent
          align="start"
          side="bottom"
          className="mly-w-max mly-rounded-lg !mly-p-0.5"
          sideOffset={8}
          onOpenAutoFocus={(e) => e.preventDefault()}
          onCloseAutoFocus={(e) => e.preventDefault()}
        >
          <TooltipProvider>
            <div className="mly-flex mly-items-stretch mly-text-midnight-gray">
              <label className="mly-relative">
                <span className="mly-inline-block mly-px-2 mly-text-xs mly-text-midnight-gray">
                  Variable
                </span>
                <input
                  value={id ?? ''}
                  onChange={(e) => {
                    updateAttributes({
                      id: e.target.value,
                    });
                  }}
                  placeholder="ie. name..."
                  className="mly-h-7 mly-w-36 mly-rounded-md mly-bg-soft-gray mly-px-2 mly-text-sm mly-text-midnight-gray focus:mly-bg-soft-gray focus:mly-outline-none"
                />
              </label>

              <Divider className="mly-mx-1.5" />

              <label className="mly-relative">
                <span className="mly-inline-block mly-px-2 mly-pl-1 mly-text-xs mly-text-midnight-gray">
                  Default
                </span>
                <input
                  value={fallback ?? ''}
                  onChange={(e) => {
                    updateAttributes({
                      fallback: e.target.value,
                    });
                  }}
                  placeholder="ie. John Doe..."
                  className="mly-h-7 mly-w-32 mly-rounded-md mly-bg-soft-gray mly-px-2 mly-pr-6 mly-text-sm mly-text-midnight-gray focus:mly-bg-soft-gray focus:mly-outline-none"
                />
                <div className="mly-absolute mly-inset-y-0 mly-right-1 mly-flex mly-items-center">
                  <Pencil className="mly-h-3 mly-w-3 mly-stroke-[2.5] mly-text-midnight-gray" />
                </div>
              </label>
            </div>
          </TooltipProvider>
        </PopoverContent>
      </Popover>
    </NodeViewWrapper>
  );
}

export const DefaultRenderVariable: RenderVariableFunction = (props) => {
  const { variable, fallback } = props;
  const { name, required } = variable;

  return (
    <span
      tabIndex={-1}
      className="mly-inline-flex mly-items-center mly-gap-[var(--variable-icon-gap)] mly-rounded-full mly-border mly-px-1.5 mly-py-0.5 mly-leading-none"
    >
      <Braces className="mly-size-[var(--variable-icon-size)] mly-shrink-0 mly-stroke-[2.5] mly-text-rose-600" />
      {name}
      {required && !fallback && (
        <AlertTriangle className="mly-size-[var(--variable-icon-size)] mly-shrink-0 mly-stroke-[2.5]" />
      )}
    </span>
  );
};
