import { H0Dropdown, type H0DropdownProps, type H0DropdownExpose } from '../src'
import { H0Dropdown as SubpathDropdown } from '../src/components/Dropdown'
const props: H0DropdownProps = { placement: 'bottom-end', maxWidth: '22rem', minHeight: 0, modelValue: true }
const exposed: H0DropdownExpose = { open() {}, close() {}, toggle() {} }
// @ts-expect-error Unsupported placement.
const invalid: H0DropdownProps = { placement: 'center' }
void [H0Dropdown, SubpathDropdown, props, exposed, invalid]
