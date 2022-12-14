import {type DOMWindow} from 'jsdom';
import type * as MockWindow from './mockWindow';
const { mockWindow } = jest.requireActual<typeof MockWindow>("./mockWindow")

let window: any;

describe("Testing window mock", () => {
    beforeEach(() => window = window || undefined);

    test("Window should be undefined.", () => {
      expect(window).toBe(undefined);
    });

    test("Post mock, window should not be undefined", () => {
        window = mockWindow();

        expect(window !== undefined).toBe(true);
    });

    test('Common Window fns mocked', () => {
        expect(typeof window.ondrag).toBe('object');
        expect(typeof window.onclick).toBe('object');
        expect(typeof window.onresize).toBe('object');
        expect(typeof window.oncancel).toBe('object');
        expect(typeof window.ondrop).toBe('object');
        expect(new window.EventTarget()).toBeInstanceOf(EventTarget);
        expect(new window.Blob()).toBeInstanceOf(Blob);
    });
  })

export {}
