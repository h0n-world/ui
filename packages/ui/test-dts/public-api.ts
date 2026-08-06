import {
    H0Accordion,
    H0ErrorMessage,
    H0Button,
    H0CheckboxGroup,
    H0DataTable,
    H0Field,
    H0Stack,
    H0Tabs,
    H0Radio,
    H0RadioGroup,
    H0SearchField,
    H0Segment,
    type H0AccordionItem,
    type H0AvatarColor,
    type H0ButtonSize,
    type H0ButtonTone,
    type H0ButtonVariant,
    type H0CarouselControlsPosition,
    type H0CarouselPaginationVariant,
    type H0CardRadius,
    type H0CheckboxOption,
    type H0CheckboxSize,
    type H0CheckboxVariant,
    type H0DataTableColumn,
    type H0DataTableFilters,
    type H0DataTableSort,
    type H0GridGap,
    type H0FileUploadVariant,
    type H0InputInputMode,
    type H0InputVariant,
    type H0ListItemElement,
    type H0RadioGroupVariant,
    type H0RadioOption,
    type H0RadioOrientation,
    type H0RadioValue,
    type H0RadioVariant,
    type H0SearchFieldVariant,
    type H0SelectVariant,
    type H0SegmentItem,
    type H0SideNavGap,
    type H0DrawerSide,
    type H0ModalSide,
    type H0TabItem,
    type H0TextareaVariant,
    type H0SheetBackdrop,
    type H0SheetSide,
    type H0TypographyAlign,
    type H0TypographyWeight
} from '@h0nio/ui'
import type * as H0Public from '@h0nio/ui'

export type H0PublicPropsFixture = [
    H0Public.H0AccordionProps,
    H0Public.H0AlertProps,
    H0Public.H0AlertDialogProps,
    H0Public.H0AvatarProps,
    H0Public.H0BadgeProps,
    H0Public.H0BreadcrumbsProps,
    H0Public.H0ButtonProps,
    H0Public.H0ButtonGroupProps,
    H0Public.H0CardProps,
    H0Public.H0CarouselProps,
    H0Public.H0CheckboxProps,
    H0Public.H0CheckboxGroupProps,
    H0Public.H0ChipProps,
    H0Public.H0ContainerProps,
    H0Public.H0DescriptionProps,
    H0Public.H0DividerProps,
    H0Public.H0ErrorMessageProps,
    H0Public.H0DrawerProps,
    H0Public.H0DataTableProps,
    H0Public.H0EmptyStateProps,
    H0Public.H0FieldProps,
    H0Public.H0FileUploadProps,
    H0Public.H0FormProps,
    H0Public.H0GridProps,
    H0Public.H0IconProps,
    H0Public.H0ImageProps,
    H0Public.H0ImageUploadProps,
    H0Public.H0InfiniteScrollProps,
    H0Public.H0InputProps,
    H0Public.H0InputOTPProps,
    H0Public.H0InlineProps,
    H0Public.H0LabelProps,
    H0Public.H0LinkProps,
    H0Public.H0ListProps,
    H0Public.H0ListItemProps,
    H0Public.H0MessageProps,
    H0Public.H0ModalProps,
    H0Public.H0NumberInputProps,
    H0Public.H0PaginationProps,
    H0Public.H0PasswordInputProps,
    H0Public.H0RadioProps,
    H0Public.H0RadioGroupProps,
    H0Public.H0RippleProps,
    H0Public.H0ScrollAreaProps,
    H0Public.H0SearchFieldProps,
    H0Public.H0SegmentProps,
    H0Public.H0SideNavProps,
    H0Public.H0SideNavGroupProps,
    H0Public.H0SideNavItemProps,
    H0Public.H0SelectProps,
    H0Public.H0SheetProps,
    H0Public.H0SkeletonProps,
    H0Public.H0SpacerProps,
    H0Public.H0SpinnerProps,
    H0Public.H0StackProps,
    H0Public.H0StepperProps,
    H0Public.H0SwitchProps,
    H0Public.H0TableProps,
    H0Public.H0TabsProps,
    H0Public.H0TextareaProps,
    H0Public.H0ToastProps,
    H0Public.H0ToastsProps,
    H0Public.H0ToolbarProps,
    H0Public.H0ToolbarGroupProps,
    H0Public.H0ToolbarItemProps,
    H0Public.H0TooltipProps,
    H0Public.H0TypographyProps
]

export type H0PublicEmitsFixture = [
    H0Public.H0AlertEmits,
    H0Public.H0AlertDialogEmits,
    H0Public.H0ButtonGroupEmits,
    H0Public.H0CarouselEmits,
    H0Public.H0CheckboxEmits,
    H0Public.H0CheckboxGroupEmits,
    H0Public.H0ChipEmits,
    H0Public.H0DrawerEmits,
    H0Public.H0DataTableEmits,
    H0Public.H0FileUploadEmits,
    H0Public.H0FormEmits,
    H0Public.H0ImageEmits,
    H0Public.H0ImageUploadEmits,
    H0Public.H0InfiniteScrollEmits,
    H0Public.H0InputEmits,
    H0Public.H0InputOTPEmits,
    H0Public.H0ModalEmits,
    H0Public.H0NumberInputEmits,
    H0Public.H0PaginationEmits,
    H0Public.H0PasswordInputEmits,
    H0Public.H0RadioEmits,
    H0Public.H0RadioGroupEmits,
    H0Public.H0SegmentEmits,
    H0Public.H0SearchFieldEmits,
    H0Public.H0SelectEmits,
    H0Public.H0SheetEmits,
    H0Public.H0SwitchEmits,
    H0Public.H0TableEmits,
    H0Public.H0TextareaEmits,
    H0Public.H0ToastEmits,
    H0Public.H0ToolbarEmits
]

const accordionItem: H0AccordionItem = { title: 'Question', content: 'Answer' }
const checkboxOption: H0CheckboxOption = { label: 'Accept', value: 'yes' }
const checkboxSize: H0CheckboxSize = 'lg'
const checkboxVariant: H0CheckboxVariant = 'secondary'
const dataTableColumns: H0DataTableColumn[] = [{ key: 'name', label: 'Name', sortable: true }]
const dataTableFilters: H0DataTableFilters = { name: 'Ada' }
const dataTableSort: H0DataTableSort = { key: 'name', direction: 'asc' }
const segmentItem: H0SegmentItem = { label: 'Daily', value: 'daily' }
const sideNavGap: H0SideNavGap = 'md'
const avatarColor: H0AvatarColor = 'blue'
const buttonSize: H0ButtonSize = 'md'
const buttonVariant: H0ButtonVariant = 'soft'
const buttonTone: H0ButtonTone = 'primary'
const carouselControlsPosition: H0CarouselControlsPosition = 'outside'
const carouselPaginationVariant: H0CarouselPaginationVariant = 'pills'
const cardRadius: H0CardRadius = ['top-left', 'top-right']
const gridGap: H0GridGap = 'lg'
const fileUploadVariant: H0FileUploadVariant = 'secondary'
const inputMode: H0InputInputMode = 'email'
const inputVariant: H0InputVariant = 'secondary'
const listItemElement: H0ListItemElement = 'button'
const radioValue: H0RadioValue = 'standard'
const radioVariant: H0RadioVariant = 'secondary'
const radioOrientation: H0RadioOrientation = 'horizontal'
const radioGroupVariant: H0RadioGroupVariant = 'cards'
const radioOptions: H0RadioOption[] = [{ title: 'Standard', value: radioValue, price: '$5.00' }]
const searchFieldVariant: H0SearchFieldVariant = 'surface'
const selectVariant: H0SelectVariant = 'secondary'
const textareaVariant: H0TextareaVariant = 'surface'
const sheetBackdrop: H0SheetBackdrop = 'blur'
const overlaySide: H0Public.H0OverlaySide = 'top'
const sheetSide: H0SheetSide = 'left'
const drawerSide: H0DrawerSide = 'bottom'
const modalSide: H0ModalSide = 'right'
const typographyAlign: H0TypographyAlign = 'center'
const typographyWeight: H0TypographyWeight = 500
const sharedSize: H0Public.H0Size = 'md'
const semanticTone: H0Public.H0SemanticTone = 'danger'
const pluginConfig: H0Public.H0PluginConfig = {
    locale: {
        pagination: {
            next: 'Forward'
        }
    },
    theme: 'dark'
}
const inputProps: H0Public.H0InputProps = { clearable: true, modelValue: 'Search', variant: inputVariant }
const checkboxProps: H0Public.H0CheckboxProps = { size: checkboxSize, variant: checkboxVariant }
const fileUploadProps: H0Public.H0FileUploadProps = { variant: fileUploadVariant }
const attributeRoutingProps: H0Public.H0AttributeRoutingProps = {
    rootAttrs: { 'data-testid': 'field-root' },
    controlAttrs: { 'aria-labelledby': 'field-label', enterkeyhint: 'next' }
}
const routedInputProps: H0Public.H0InputProps = { ...attributeRoutingProps, defaultValue: 'Ada' }
const buttonProps: H0Public.H0ButtonProps = { size: 'md', tone: buttonTone, variant: buttonVariant }
const carouselProps: H0Public.H0CarouselProps = { autoplay: true, controlsPosition: carouselControlsPosition, paginationVariant: carouselPaginationVariant }
const searchFieldProps: H0Public.H0SearchFieldProps = { modelValue: 'Search', variant: searchFieldVariant }
const selectProps: H0Public.H0SelectProps = { options: [], variant: selectVariant }
const textareaProps: H0Public.H0TextareaProps = { variant: textareaVariant }
const radioProps: H0Public.H0RadioProps = { modelValue: radioValue, value: radioValue, variant: radioVariant }
const radioGroupProps: H0Public.H0RadioGroupProps = { modelValue: radioValue, options: radioOptions, orientation: radioOrientation, variant: radioGroupVariant }
const inferredSelectOption: H0Public.H0SelectOption<'daily' | 'weekly'> = { label: 'Daily', value: 'daily' }
const typedTableColumn: H0Public.H0TableColumn<{ id: number; name: string }> = { key: 'name', label: 'Name', value: (row) => row.name }
const responsiveGap: H0Public.H0ResponsiveValue<H0Public.H0Space> = { base: 'sm', lg: 'xl' }
const tabItems: H0TabItem<'overview' | 'settings'>[] = [{ label: 'Overview', value: 'overview' }]

void [
    H0Accordion,
    H0ErrorMessage,
    H0Button,
    H0CheckboxGroup,
    H0DataTable,
    H0Field,
    H0Stack,
    H0Tabs,
    H0Radio,
    H0RadioGroup,
    H0SearchField,
    H0Segment,
    accordionItem,
    checkboxOption,
    checkboxSize,
    dataTableColumns,
    dataTableFilters,
    dataTableSort,
    segmentItem,
    avatarColor,
    buttonVariant,
    buttonTone,
    carouselControlsPosition,
    carouselPaginationVariant,
    cardRadius,
    gridGap,
    fileUploadVariant,
    inputMode,
    listItemElement,
    radioValue,
    radioVariant,
    radioOrientation,
    radioGroupVariant,
    radioOptions,
    searchFieldVariant,
    selectVariant,
    textareaVariant,
    sheetBackdrop,
    overlaySide,
    sheetSide,
    drawerSide,
    modalSide,
    typographyAlign,
    typographyWeight,
    sharedSize,
    semanticTone,
    pluginConfig,
    inputProps,
    checkboxProps,
    fileUploadProps,
    attributeRoutingProps,
    routedInputProps,
    buttonProps,
    carouselProps,
    searchFieldProps,
    selectProps,
    textareaProps,
    radioProps,
    radioGroupProps,
    inferredSelectOption,
    typedTableColumn,
    responsiveGap,
    tabItems
]
