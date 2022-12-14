/**
 * Function mockWindow was created based off of packages browser-env and window.
 * Both packages are not very well maintained and contained a variety of vulnerabilities.
 */
import {type ConstructorOptions, type DOMWindow, JSDOM, ResourceLoader} from 'jsdom';

type JsdomConfig = {
	features: Record<string, boolean>;
} & Partial<ConstructorOptions>;

const defaultConfiguration: JsdomConfig = {
	features: {
		...new ResourceLoader(),
		FetchExternalResources: false, // eslint-disable-line
		ProcessExternalResources: false, // eslint-disable-line
	},
};

// Create the mocked window.
const {window: defaultWindow} = new JSDOM('', defaultConfiguration);

/**
 * Function polyfillProperty takes in a string and creates the necessary polyfill.
 *
 * @param prop {} the global property to polyfill.
 * @returns void.
 */
const polyfillProperty = (prop: keyof DOMWindow): typeof globalThis => Object.defineProperty(global, prop, {
	configurable: true,
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	get: () => defaultWindow[prop],
});

/**
 * MockWindow processes the JSDOM window object and mocks the missing global
 * window properties.
 *
 * @returns mocked window object
 */
export const mockWindow = (): DOMWindow => {
	Object.getOwnPropertyNames(defaultWindow)
		.forEach((prop: keyof DOMWindow) => {
			const needsPolyfill: boolean = typeof (global as any)[prop] === 'undefined' && prop !== 'undefined';

			if (needsPolyfill) {
				polyfillProperty(prop);
			}
		});

	// Return reference to original window object
	return defaultWindow;
};
