import random
import display
import time
import touch
import device
import asyncio

display.brightness(3)

async def fn(arg):
    global f
    if not f == 0:
        return
    quiz()

async def bold(num, sec):
    global battery
    width = 1
    timeout = time.ticks_ms() + sec * 1000
    while True:
        text = display.Text(num, 320, 200, display.WHITE, justify=display.MIDDLE_CENTER)
        display.show(text, battery)
        text = display.Text(num, 320 + width, 200, display.WHITE, justify=display.MIDDLE_CENTER)
        display.show(text, battery)
        text = display.Text(num, 320, 200 + width, display.WHITE, justify=display.MIDDLE_CENTER)
        display.show(text, battery)
        text = display.Text(num, 320 + width, 200 + width, display.WHITE, justify=display.MIDDLE_CENTER)
        display.show(text, battery)
        if time.ticks_ms() >= timeout:
            break

async def quiz():
    global sum
    global f
    global battery
    sum = 0
    f = 1
    battery = display.Text(str(device.battery_level()), 0, 0, display.WHITE, justify=display.TOP_LEFT)
    timeout = time.ticks_ms() + 1 * 1000
    while True:
        text = display.Text("3..", 260, 200, display.WHITE, justify=display.MIDDLE_CENTER)
        display.show(text, battery)
        if time.ticks_ms() >= timeout:
            break
    timeout = time.ticks_ms() + 1 * 1000
    while True:
        text = display.Text("2..", 320, 200, display.WHITE, justify=display.MIDDLE_CENTER)
        display.show(text, battery)
        if time.ticks_ms() >= timeout:
            break
    timeout = time.ticks_ms() + 1 * 1000
    while True:
        text = display.Text("1..", 380, 200, display.WHITE, justify=display.MIDDLE_CENTER)
        display.show(text, battery)
        if time.ticks_ms() >= timeout:
            break
    await bold("start!", 1)
    global tmp
    for i in range({{num}}):
        while True:
            num = int(random.randint({min}, {max}))
            if num != tmp:
                tmp = num
                break
        sum += num
        num = str(num)
        await bold(num, {int})
    sub = display.Text('Thinking...', 320, 140, display.WHITE, justify=display.MIDDLE_CENTER)
    text = display.Text('touch to display answer', 320, 200, display.WHITE, justify=display.MIDDLE_CENTER)
    display.show(text, sub, battery)
    f = 2
    while (True):
        if touch.state(touch.EITHER):
            break
    f = 0
    sum = str(sum)
    sub = display.Text('ANSWER', 320, 140, display.GREEN, justify=display.MIDDLE_CENTER)
    text = display.Text(sum, 320, 200, display.GREEN, justify=display.MIDDLE_CENTER)
    display.show(text, sub, battery)
    t = time.ticks_ms()
    while (True):
        if t + 1000 < time.ticks_ms():
            break

async def main():
    global f
    global tmp
    global battery
    tmp = 0
    battery = display.Text(str(device.battery_level()), 0, 0, display.WHITE, justify=display.TOP_LEFT)
    text = display.Text('touch to start', 320, 200, display.WHITE, justify=display.MIDDLE_CENTER)
    display.show(text, battery)
    while True:
        await asyncio.sleep(0.1)
        if touch.state(touch.EITHER):
            await fn(None)
            break

f = 0
tmp = 0
battery = None
asyncio.create_task(main())
asyncio.get_event_loop().run_forever()
