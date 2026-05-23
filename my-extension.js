class GandiPhysicsExtension {
    constructor(runtime) {
        this.runtime = runtime;
        
        // Default physics environment variables
        this.gravity = -9.8;
        this.friction = 0.98;
    }

    /**
     * This function defines how your extension looks and behaves in the Gandi sidebar.
     */
    getInfo() {
        return {
            id: 'gandiPhysicsBluePurple',
            name: 'SC Simple physics',
            color1: '#6C5CE7', // Vibrant Bluish-Purple
            color2: '#4834D4', // Darker Accent Border
            blocks: [
                // Set Environment Gravity
                {
                    opcode: 'setGravity',
                    blockType: 'command',
                    text: 'set world gravity to [GRAVITY]',
                    arguments: {
                        GRAVITY: {
                            type: 'number',
                            defaultValue: -9.8
                        }
                    }
                },
                // Update Object Velocity (To be put inside a forever loop)
                {
                    opcode: 'updatePhysics',
                    blockType: 'command',
                    text: 'update physics for sprite: vx [VX] vy [VY]',
                    arguments: {
                        VX: { type: 'number', defaultValue: 0 },
                        VY: { type: 'number', defaultValue: 0 }
                    }
                },
                // Calculate Bounce/Collision Velocity
                {
                    opcode: 'bounceVelocity',
                    blockType: 'reporter',
                    text: 'bounce velocity [VELOCITY] with elasticity [BOUNCE]',
                    arguments: {
                        VELOCITY: { type: 'number', defaultValue: 10 },
                        BOUNCE: { type: 'number', defaultValue: 0.8 } // Keeps 80% speed on impact
                    }
                },
                // Apply Friction to Velocity
                {
                    opcode: 'applyFriction',
                    blockType: 'reporter',
                    text: 'apply friction to speed [VELOCITY]',
                    arguments: {
                        VELOCITY: { type: 'number', defaultValue: 5 }
                    }
                }
            ]
        };
    }

    /**
     * Implementation for the 'setGravity' block.
     */
    setGravity(args) {
        this.gravity = Number(args.GRAVITY);
    }

    /**
     * Implementation for the 'updatePhysics' block.
     */
    updatePhysics(args, util) {
        const sprite = util.target;
        if (sprite) {
            // Move the sprite directly based on horizontal and vertical speed
            sprite.y += Number(args.VY);
            sprite.x += Number(args.VX);
        }
    }

    /**
     * Implementation for the 'bounceVelocity' block.
     */
    bounceVelocity(args) {
        // Reverses the direction (multiplies by -1) and scales by elasticity
        return Number(args.VELOCITY) * -1 * Number(args.BOUNCE);
    }

    /**
     * Implementation for the 'applyFriction' block.
     */
    applyFriction(args) {
        // Gradually slows down speed over time
        return Number(args.VELOCITY) * this.friction;
    }
}

// Register the physics extension into Gandi's environment
Scratch.extensions.register(new GandiPhysicsExtension());
