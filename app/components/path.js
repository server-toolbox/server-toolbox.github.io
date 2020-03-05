/** @arg {string} dir */
export function up(dir){
    const pieces = dir.split('/');
    pieces.pop();
    return pieces.join('/')
}

export const components = up(new URL(import.meta.url).pathname)

export const app = up(components)

export const root = up(app)

export const containers = app + '/containers'

export const styles = app + '/styles'

export const locale = app + '/locale'
