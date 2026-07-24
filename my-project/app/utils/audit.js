function logAudit(action, details) { 
    console.log(`Action: $[action], Details: $(details)`);
}

module.exports = { logAudit };