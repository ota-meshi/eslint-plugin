module.exports = {
    has,
    requireOf,
}

/**
 * Checks if exists module
 * @param {string} name
 */
function has(name) {
    try {
        require.resolve(name)
        return true
    } catch (e) {
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
