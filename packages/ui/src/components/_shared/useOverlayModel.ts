import { useH0ControllableState } from '../../composables/useH0ControllableState'

type H0OverlayModelProps = {
    modelValue?: boolean
    defaultValue?: boolean
}

type H0OverlayModelEmit = ((event: 'update:modelValue', value: boolean) => void) & ((event: 'change', value: boolean) => void) & ((event: 'close') => void)

export function useH0OverlayModel(props: H0OverlayModelProps, emit: H0OverlayModelEmit) {
    const state = useH0ControllableState<boolean>({ modelValue: () => props.modelValue, defaultValue: () => props.defaultValue ?? false, onUpdate: (value) => emit('update:modelValue', value) })

    function close() {
        state.setValue(false)
        emit('change', false)
        emit('close')
    }

    return { close, currentValue: state.value }
}
