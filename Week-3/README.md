# Intelligent Sensor Networks

## Week 3 - Intro to Tessel 2 IoT Modules

### 0. Prerequisites

We assume you have followed your previous workshop guides and have a basic Node.js setup. If not, follow the instructions from the previous workshops.

We need to install the `t2-cli` command line utility to interface with the Tessel 2 module. You can find instructions to do so [here](http://tessel.github.io/t2-start/index.html). This will include instructions to install `t2-cli` and the necessary drivers.

To test your installation, type `t2 version` to ensure the command line utility is installed. Don't worry if it states "No Authorized Tessels Found". We haven't connected the Tessel yet! We just wanted to check if it installed successfully.

http://stackoverflow.com/questions/12996397/command-not-found-when-using-sudo

### 1. Installation

Plug in your Tessel 2 to your computer. It should take around 30 seconds to boot. You will know it is ready when the blue LED stops flashing.

To see if your Tessel 2 has successfully connected, run `t2 list`. You should see any Tessels connected over USB or the same WiFi network as your computer.

If you want, you can rename your Tessel. Run `t2 rename [name]` and run `t2 list` again to see your renamed Tessel!

Next, you need to authorize your computer to push your code to your connected Tessel. Run `t2 provision` to do so.

With the Tessel connected and authorized, let's check for firmware updates! Run `t2 update` to download and install any available firmware updates.

### 2. Simple Blinky Application

Let's make our first Tessel application! Make a directory called `Blinky`, enter that directory and run `t2 init`. This creates three files:

1. `package.json` - holds metadata for project as we explained in previous workshops
2. `.tesselinclude` - used by t2-cli to optimize bundle size
3. `index.js` - the entry point to our application. We can rename it later.
Let's test it out! We can run `t2 run index.js`. And watch the blue and green LEDs blink back and forth!

If you want to untether your Tessel from your computer, you can do `t2 push index.js`. Now it will run on its own when connected to USB power!

If you want to remove the application, you can run `t2 erase` to clear the code.
