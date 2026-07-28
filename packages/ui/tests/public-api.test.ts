import type { App, Component } from 'vue'
import { describe, expect, it } from 'vitest'
import H0Nui, { h0ComponentManifest } from '../src'

describe('public plugin registry', () => {
    it('registers every public component under a unique H0 name', () => {
        const registrations: string[] = []
        const app = {
            component(name: string, _component: Component) {
                registrations.push(name)
                return this
            },
            provide() {
                return this
            }
        } as unknown as App

        H0Nui.install(app)

        expect(registrations).toHaveLength(h0ComponentManifest.length)
        expect(new Set(registrations).size).toBe(registrations.length)
        expect(registrations.every((name) => /^H0[A-Z]/.test(name))).toBe(true)
        expect(registrations).toContain('H0ErrorMessage')
        expect(registrations).toContain('H0SearchField')
        expect(registrations).toContain('H0Radio')
        expect(registrations).toContain('H0RadioGroup')
        expect(registrations).toContain('H0DataTable')
        expect(registrations).toEqual(expect.arrayContaining(['H0SideNav', 'H0SideNavGroup', 'H0SideNavItem']))
    })
})
