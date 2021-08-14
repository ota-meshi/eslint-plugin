"use strict"

const semver = require("semver")

module.exports = {
    has,
    requireOf,
}

/**
 * Checks if exists module
 * @param {string} name
 */
function has(name) {
    const parts = name.split(/@/u)
    if (parts.length > 1 && parts[0]) {
        const v = parts[parts.length - 1]
        try {
            const pkg = require(`${parts.slice(0, -1).join("@")}/package.json`)
            return semver.lte(v, pkg.version)
        } catch (_e) {
            return false
        }
    }
    try {
        require.resolve(name)
        return true
    } catch (_e) {
        return false
    }
}

/**
 * Checks exists module and return config
 */
function requireOf(names, getConfig, getFallback) {
    let missings = names.filter((n) => !has(n))

    if (missings.length) {
        return {
            plugins: ["@ota-meshi"],
            rules: {
                "@ota-meshi/missing-module-for-config": ["error", missings],
            },
            ...(getFallback ? getFallback() : {}),
        }
    }

    return getConfig()
}
