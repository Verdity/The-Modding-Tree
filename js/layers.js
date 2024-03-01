addLayer("p", {
    name: "GigaReset", // This is optional, only used in a few places, If absent it just uses the layer id.
    symbol: "GR", // This appears on the layer's node. Default is the id with the first letter capitalized
    position: 0, // Horizontal position within a row. By default it uses the layer id and sorts in alphabetical order
    startData() { return {
        unlocked: true,
		points: new Decimal(0),
    }},
    color: "Orange",
    requires: new Decimal(10), // Can be a function that takes requirement increases into account
    resource: "GigaReset points", // Name of prestige currency
    baseResource: "points", // Name of resource prestige is based on
    baseAmount() {return player.points}, // Get the current amount of baseResource
    type: "normal", // normal: cost to gain currency depends on amount gained. static: cost depends on how much you already have
    exponent: 0.5, // Prestige currency exponent
    gainMult() { // Calculate the multiplier for main currency from bonuses
        let mult = new Decimal(1)
        if (hasUpgrade('p', 13)) mult = mult.times(upgradeEffect('p', 13))
        return mult
    },
    gainExp() { // Calculate the exponent on main currency from bonuses
        return new Decimal(1)
    },
    row: 0, // Row the layer is in on the tree (0 is the first row)
    hotkeys: [
        {key: "p", description: "P: Reset for prestige points", onPress(){if (canReset(this.layer)) doReset(this.layer)}},
    ],
    layerShown(){return true},
    
    upgrades: {
        11:{
            title: "First GigaUpgrade",
    description: "Double your point gain.",
    cost: new Decimal(1),
        },
        12:{
            title: "Second GigaUpgrade",
    description: "Increase Point gain by GigaPrestiges",
    cost: new Decimal(3),
    effect() {
        return player[this.layer].points.add(1).pow(0.75)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
        },
        13:{
            title: "Third GigaUpgrade",
    description: "Increase GigaReset gain by Points.",
    cost: new Decimal(5),
    effect() {
        return player.points.add(1).pow(0.15)
    },
    effectDisplay() { return format(upgradeEffect(this.layer, this.id))+"x" },
    
    },
        }
    },
)

addLayer("d", {
    startData() { return {                  // startData is a function that returns default data for a layer. 
        unlocked: false,                     // You can add more variables here to add them to your layer.
        points: new Decimal(0),             // "points" is the internal name for the main resource of the layer.
    }},

    color: "#4BDC13",                       // The color for this layer, which affects many elements.
    resource: "prestige points",            // The name of this layer's main prestige resource.
    row: 0,                                 // The row this layer is on (0 is the first row).

    baseResource: "GigaReset points",                 // The name of the resource your prestige gain is based on.
    baseAmount() { return player.points },  // A function to return the current amount of baseResource.

    requires: new Decimal(100),              // The amount of the base needed to  gain 1 of the prestige currency.
                                            // Also the amount required to unlock the layer.

    type: "normal",                         // Determines the formula used for calculating prestige currency.
    exponent: 0,                          // "normal" prestige gain is (currency^exponent).

    gainMult() {                            // Returns your multiplier to your gain of the prestige resource.
        return new Decimal(1)               // Factor in any bonuses multiplying gain here.
    },
    gainExp() {                             // Returns the exponent to your gain of the prestige resource.
        return new Decimal(1)
    },

    layerShown() { unlocked },          // Returns a bool for if this layer's node should be visible in the tree.

    upgrades: {
        // Look in the upgrades docs to see what goes here!
    },
})
