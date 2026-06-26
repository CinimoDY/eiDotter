'use client';

import React, { useId, useMemo, useRef, useState } from 'react';
import {
  Select as AriaSelect,
  SelectValue as AriaSelectValue,
  ComboBox as AriaComboBox,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Popover as AriaPopover,
  Button as AriaButton,
  Input as AriaInput,
  Label as AriaLabel,
  Text as AriaText,
  type Key,
  type Selection,
} from 'react-aria-components';
import { cn } from '../../../utils/cn';
import './Select.css';

export interface SelectOption {
  /** Stable value submitted / reported on change. */
  value: string;
  /** Visible label. */
  label: string;
  /** Disable this single option. */
  disabled?: boolean;
}

type SelectSize = 'sm' | 'md' | 'lg' | 'small' | 'medium' | 'large';

interface SelectBaseProps {
  /** Options to render. */
  options: SelectOption[];
  /** Visible field label (rendered above the control). */
  label?: string;
  /** Accessible label when there is no visible `label`. */
  'aria-label'?: string;
  /** Text shown when nothing is selected. */
  placeholder?: string;
  /** Helper text below the control. */
  description?: string;
  /** Error message — shown (and marks the field invalid) when `variant="error"`. */
  errorMessage?: string;
  /** Visual / validation variant. */
  variant?: 'default' | 'error';
  /** Control size. small/medium/large are @deprecated aliases for sm/md/lg. */
  size?: SelectSize;
  /** Disable the whole control. */
  disabled?: boolean;
  /** Mark the field required (React Aria). */
  isRequired?: boolean;
  /** Enable type-to-filter (ComboBox for single-select; filter input for multi-select). */
  searchable?: boolean;
  /** Placeholder for the search/filter input (searchable variants). */
  searchPlaceholder?: string;
  /** Message shown when filtering matches nothing. */
  emptyMessage?: React.ReactNode;
  /** Form field name (a hidden native input is emitted for form submission). */
  name?: string;
  /** Id applied to the focusable control (for external `<label htmlFor>`). */
  id?: string;
  /** Additional CSS class merged onto the root. */
  className?: string;
}

interface SingleSelectProps extends SelectBaseProps {
  /** Single-selection mode (default). */
  multiple?: false;
  /** Selected value (controlled). Empty string means nothing selected. */
  value?: string;
  /** Initial value (uncontrolled). */
  defaultValue?: string;
  /** Fired with the new value on change. */
  onChange?: (value: string) => void;
}

interface MultiSelectProps extends SelectBaseProps {
  /** Multi-selection mode — `value`/`onChange` operate on string arrays. */
  multiple: true;
  /** Selected values (controlled). */
  value?: string[];
  /** Initial values (uncontrolled). */
  defaultValue?: string[];
  /** Fired with the new array of values on change. */
  onChange?: (value: string[]) => void;
}

export type SelectProps = SingleSelectProps | MultiSelectProps;

// ---------------------------------------------------------------------------
// Shared style fragments — layout in Tailwind, phosphor in Select.css
// ---------------------------------------------------------------------------

const sizeTrigger: Record<'sm' | 'md' | 'lg', string> = {
  sm: 'text-dos-text-sm px-2.5 py-1 min-h-7 gap-2',
  md: 'text-dos-text-md px-3 py-2 min-h-8 gap-2',
  lg: 'text-dos-text-lg px-4 py-2.5 min-h-10 gap-2',
};

const normalizeSize = (size: SelectSize = 'md'): 'sm' | 'md' | 'lg' =>
  (({ small: 'sm', medium: 'md', large: 'lg' } as const)[
    size as 'small' | 'medium' | 'large'
  ] ?? (size as 'sm' | 'md' | 'lg'));

const labelClass =
  'eidotter-select__label text-dos-text-brand font-dos text-dos-text-xs uppercase tracking-wider';
const descClass = 'eidotter-select__description text-dos-text-muted font-dos text-dos-text-xs';
const errClass = 'eidotter-select__error text-dos-text-error font-dos text-dos-text-xs';

const triggerBase =
  'eidotter-select__trigger flex items-center w-full bg-transparent text-dos-text-brand font-dos ' +
  'border-2 border-dos-border-default outline-none box-border';

const optionClass = 'eidotter-select__option font-dos';

const DEFAULT_EMPTY = 'NO MATCHES';

/** Map the empty `''` sentinel / nullish to React Aria's `null` (placeholder). */
const toKey = (value: string | undefined): Key | null => (value == null || value === '' ? null : value);

// ---------------------------------------------------------------------------
// Single-select — React Aria Select (button + popover + listbox)
// ---------------------------------------------------------------------------

const SingleSelect: React.FC<SingleSelectProps> = ({
  options,
  label,
  placeholder,
  description,
  errorMessage,
  variant = 'default',
  size,
  value,
  defaultValue,
  onChange,
  disabled,
  isRequired,
  name,
  id,
  className,
  'aria-label': ariaLabel,
}) => {
  const isInvalid = variant === 'error';
  const isControlled = value !== undefined;
  const sz = normalizeSize(size);

  return (
    <AriaSelect
      aria-label={!label ? ariaLabel : undefined}
      selectedKey={isControlled ? toKey(value) : undefined}
      defaultSelectedKey={!isControlled ? defaultValue : undefined}
      onSelectionChange={(key) => onChange?.(key == null ? '' : String(key))}
      isDisabled={disabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      name={name}
      placeholder={placeholder}
      className={cn('eidotter-select flex flex-col gap-1', className)}
    >
      {label && <AriaLabel className={labelClass}>{label}</AriaLabel>}
      <AriaButton id={id} className={cn(triggerBase, sizeTrigger[sz])}>
        <AriaSelectValue className="eidotter-select__value flex-1 text-left truncate" />
        <span aria-hidden="true" className="eidotter-select__arrow">
          ▼
        </span>
      </AriaButton>
      {description && !isInvalid && (
        <AriaText slot="description" className={descClass}>
          {description}
        </AriaText>
      )}
      {errorMessage && isInvalid && (
        <AriaText slot="errorMessage" className={errClass}>
          {errorMessage}
        </AriaText>
      )}
      <AriaPopover className="eidotter-select__popover">
        <AriaListBox className="eidotter-select__listbox" items={options}>
          {(item) => (
            <AriaListBoxItem
              id={item.value}
              textValue={item.label}
              isDisabled={item.disabled}
              className={optionClass}
            >
              {item.label}
            </AriaListBoxItem>
          )}
        </AriaListBox>
      </AriaPopover>
    </AriaSelect>
  );
};

// ---------------------------------------------------------------------------
// Searchable single-select — React Aria ComboBox (input + popover + listbox)
// ---------------------------------------------------------------------------

const SearchableSelect: React.FC<SingleSelectProps> = ({
  options,
  label,
  placeholder,
  description,
  errorMessage,
  variant = 'default',
  size,
  value,
  defaultValue,
  onChange,
  disabled,
  isRequired,
  name,
  id,
  className,
  emptyMessage = DEFAULT_EMPTY,
  'aria-label': ariaLabel,
}) => {
  const isInvalid = variant === 'error';
  const isControlled = value !== undefined;
  const sz = normalizeSize(size);

  return (
    <AriaComboBox
      aria-label={!label ? ariaLabel : undefined}
      defaultItems={options}
      selectedKey={isControlled ? toKey(value) : undefined}
      defaultSelectedKey={!isControlled ? defaultValue : undefined}
      onSelectionChange={(key) => onChange?.(key == null ? '' : String(key))}
      isDisabled={disabled}
      isInvalid={isInvalid}
      isRequired={isRequired}
      name={name}
      menuTrigger="focus"
      allowsEmptyCollection
      className={cn('eidotter-select eidotter-select--searchable flex flex-col gap-1', className)}
    >
      {label && <AriaLabel className={labelClass}>{label}</AriaLabel>}
      <div className={cn(triggerBase, sizeTrigger[sz])}>
        <AriaInput
          id={id}
          placeholder={placeholder}
          className="eidotter-select__input flex-1 min-w-0 bg-transparent text-inherit outline-none"
        />
        <AriaButton className="eidotter-select__arrow-btn" aria-label="Show options">
          <span aria-hidden="true" className="eidotter-select__arrow">
            ▼
          </span>
        </AriaButton>
      </div>
      {description && !isInvalid && (
        <AriaText slot="description" className={descClass}>
          {description}
        </AriaText>
      )}
      {errorMessage && isInvalid && (
        <AriaText slot="errorMessage" className={errClass}>
          {errorMessage}
        </AriaText>
      )}
      <AriaPopover className="eidotter-select__popover">
        <AriaListBox
          className="eidotter-select__listbox"
          renderEmptyState={() => <div className="eidotter-select__empty">{emptyMessage}</div>}
        >
          {(item: SelectOption) => (
            <AriaListBoxItem
              id={item.value}
              textValue={item.label}
              isDisabled={item.disabled}
              className={optionClass}
            >
              {item.label}
            </AriaListBoxItem>
          )}
        </AriaListBox>
      </AriaPopover>
    </AriaComboBox>
  );
};

// ---------------------------------------------------------------------------
// Multi-select — Button trigger + standalone Popover + multi ListBox
// (React Aria has no high-level multi-select; this composes the primitives.)
// ---------------------------------------------------------------------------

const MultiSelect: React.FC<MultiSelectProps> = ({
  options,
  label,
  placeholder = 'Select…',
  description,
  errorMessage,
  variant = 'default',
  size,
  value,
  defaultValue,
  onChange,
  disabled,
  name,
  id,
  className,
  searchable,
  searchPlaceholder = 'FILTER…',
  emptyMessage = DEFAULT_EMPTY,
  'aria-label': ariaLabel,
}) => {
  const isInvalid = variant === 'error';
  const isControlled = value !== undefined;
  const sz = normalizeSize(size);

  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [internal, setInternal] = useState<string[]>(defaultValue ?? []);
  const selected = isControlled ? value ?? [] : internal;

  const baseId = useId();
  const labelId = `${baseId}-label`;

  const selectedSet = useMemo<Selection>(
    () => new Set<Key>(isControlled ? value ?? [] : internal),
    [isControlled, value, internal],
  );
  const labelMap = useMemo(() => new Map(options.map((o) => [o.value, o.label])), [options]);

  const filtered = useMemo(() => {
    if (!searchable || !query.trim()) return options;
    const q = query.trim().toLowerCase();
    return options.filter((o) => o.label.toLowerCase().includes(q));
  }, [options, searchable, query]);

  const handleChange = (selection: Selection) => {
    const next =
      selection === 'all' ? options.map((o) => o.value) : Array.from(selection, String);
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  // Reset the filter each time the popover opens so stale queries don't hide
  // options on the next open.
  const handleOpenChange = (next: boolean) => {
    setOpen(next);
    if (next) setQuery('');
  };

  const triggerText =
    selected.length === 0 ? placeholder : selected.map((v) => labelMap.get(v) ?? v).join(', ');

  return (
    <div className={cn('eidotter-select eidotter-select--multi flex flex-col gap-1', className)}>
      {label && (
        <span id={labelId} className={labelClass}>
          {label}
        </span>
      )}
      <AriaButton
        ref={triggerRef}
        id={id}
        isDisabled={disabled}
        aria-label={!label ? ariaLabel : undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-haspopup="listbox"
        aria-expanded={open}
        onPress={() => handleOpenChange(!open)}
        className={cn(triggerBase, sizeTrigger[sz], isInvalid && 'eidotter-select__trigger--error')}
      >
        <span
          className={cn(
            'eidotter-select__value flex-1 text-left truncate',
            selected.length === 0 && 'eidotter-select__value--placeholder text-dos-text-muted',
          )}
        >
          {triggerText}
        </span>
        <span aria-hidden="true" className="eidotter-select__arrow">
          ▼
        </span>
      </AriaButton>
      {description && !isInvalid && <span className={descClass}>{description}</span>}
      {errorMessage && isInvalid && <span className={errClass}>{errorMessage}</span>}
      {name && selected.map((v) => <input key={v} type="hidden" name={name} value={v} />)}
      <AriaPopover
        triggerRef={triggerRef}
        isOpen={open}
        onOpenChange={handleOpenChange}
        className="eidotter-select__popover"
      >
        {searchable && (
          <input
            autoFocus
            type="text"
            className="eidotter-select__search font-dos"
            placeholder={searchPlaceholder}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter options"
          />
        )}
        <AriaListBox
          aria-label={ariaLabel || label || 'Options'}
          selectionMode="multiple"
          selectedKeys={selectedSet}
          onSelectionChange={handleChange}
          items={filtered}
          autoFocus={searchable ? undefined : 'first'}
          renderEmptyState={() => <div className="eidotter-select__empty">{emptyMessage}</div>}
          className="eidotter-select__listbox"
        >
          {(item) => (
            <AriaListBoxItem
              id={item.value}
              textValue={item.label}
              isDisabled={item.disabled}
              className={cn(optionClass, 'eidotter-select__option--multi')}
            >
              {({ isSelected }) => (
                <>
                  <span aria-hidden="true" className="eidotter-select__check">
                    {isSelected ? '[x]' : '[ ]'}
                  </span>
                  <span className="flex-1">{item.label}</span>
                </>
              )}
            </AriaListBoxItem>
          )}
        </AriaListBox>
      </AriaPopover>
    </div>
  );
};

/**
 * DOS-styled Select / Dropdown built on React Aria primitives (DMNC-593).
 *
 * Three modes via props:
 * - **default** — single-select `Select` (button + popover + listbox)
 * - **`searchable`** — single-select `ComboBox` with type-to-filter
 * - **`multiple`** — multi-select listbox; `value`/`onChange` use string arrays
 *   (combine with `searchable` for a filterable multi-select)
 *
 * React Aria handles keyboard nav, focus management, and ARIA; phosphor glow on
 * focus/open lives in `Select.css`. The single-value API (`value` / `options` /
 * `onChange`) is backward-compatible with the previous native-`<select>` MVP.
 */
export const Select = (props: SelectProps): React.ReactElement => {
  if (props.multiple) return <MultiSelect {...props} />;
  if (props.searchable) return <SearchableSelect {...props} />;
  return <SingleSelect {...props} />;
};

Select.displayName = 'Select';
