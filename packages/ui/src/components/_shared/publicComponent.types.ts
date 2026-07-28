import type { AllowedComponentProps, ComponentCustomProps, VNodeProps } from 'vue'

type H0VueComponent = abstract new (...args: never[]) => {
    $emit: (...args: never[]) => void
    $props: object
}

type H0FrameworkProp = keyof AllowedComponentProps | keyof ComponentCustomProps | keyof VNodeProps

export type H0PublicProps<Component extends H0VueComponent> = Omit<InstanceType<Component>['$props'], H0FrameworkProp>
export type H0PublicEmits<Component extends H0VueComponent> = InstanceType<Component>['$emit']
