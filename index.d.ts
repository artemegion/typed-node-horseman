/**
 * Horseman lets you run PhantomJS from Node.
 */
declare module "node-horseman"
{
    namespace Horseman
    {
        /** options for creating `Horseman` instance */
        interface IHorsemanOptions
        {
            /** how long to wait for page loads or wait periods, default: 5000ms */
            timeout?: number;

            /** how frequently to poll for page load state, default: 50ms */
            interval?: number;

            /** load all inlined images, default: true */
            loadImages?: boolean;

            /** switch to new tab when created, default: false */
            switchToNewTab?: boolean;

            /** enable disk cache, default: false */
            diskCache?: boolean;

            /** location for the disk cache (requires PhantomJS 2.0.0 or above) */
            diskCachePath?: string;

            /** a file where to store/use cookies */
            cookiesFile?: string;

            /** ignores the SSL protocol for secure connections */
            ignoreSSLErrors?: boolean;

            /** sets the SSL protocol for secure connections */
            sslProtocol?: ('sslv3' | 'sslv2' | 'tlsv1' | 'any');

            /** enables web security and forbids cross-domain XHR */
            webSecurity?: boolean;

            /** whether jQuery is automatically loaded into each page */
            injectJquery?: boolean;

            /** whether bluebird is automatically loaded into each page */
            injectBluebird?: boolean;

            /** whether to enable bluebird debug features */
            bluebirdDebug?: boolean;

            /** specify the proxy server to use address:port */
            proxy?: string;

            /** specify the proxy server type */
            proxyType?: ('http' | 'socks5' | 'none');

            /** specify the auth information for the proxy user:pass */
            proxyAuth?: string;

            /** specify path to phantomjs executable */
            phantomPath?: string;

            /** explicit phantomjs options */
            phantomOptions?: any;

            /** enable web inspector on specified port */
            debugPort?: number;

            /** autorun on launch when in debug mode */
            debugAutorun?: boolean;
        }

        /** base for paper sizes used in PDF rendering */
        interface IPaperSize
        {
            /** PDF header */
            header?: IPaperSizeElement;

            /** PDF footer */
            footer?: IPaperSizeElement;

            /** document's margin */
            margin: string;
        }

        /** paper size using custom dimensions */
        interface IPaperSizeCustom extends IPaperSize
        {
            /** paper width */
            width: string;

            /** paper height */
            height: string;
        }

        /** paper size using known formats */
        interface IPaperSizeFormat extends IPaperSize
        {
            /** paper format */
            format: ('A3' | 'A4' | 'A5' | 'Legal' | 'Letter' | 'Tabloid');

            /** paper orientation */
            orientation: ('portrait' | 'landscape');
        }

        /** base for PDF footer and header */
        interface IPaperSizeElement
        {
            height: string;
            contents: ((pageNum: number, numPages: number) => string);
        }

        /** cookie object */
        interface ICookie
        {
            /** cookie name */
            name?: string;

            /** cookie value */
            value?: string;

            /** cookie domain */
            domain?: string;
        }

        /** represents an area, defined either by width and height, or margin from page's edges */
        interface IArea
        {
            /** height */
            height?: number;

            /** width */
            width?: number;


            /** margin from left edge */
            left?: number;

            /** margin from right edge */
            right?: number;


            /** margin from top edge */
            top?: number;

            /** margin from bottom edge */
            bottom?: number;
        }

        /** options for type() */
        interface ITypeOptions
        {
            /** event type */
            eventType: IKeyboardEventType;

            /** modifiers */
            modifiers: string;
        }

        /** keyboard event type */
        type IKeyboardEventType = ('keypress' | 'keyup' | 'keydown');

        /** mouse event type */
        type IMouseEventType = ('mouseup' | 'mousedown' | 'mousemove' | 'doubleclick' | 'click');

        /** image format */
        type IImageType = ('PNG' | 'GIF' | 'JPEG');

        class HorsemanPromise<T> extends Promise<T>
        {
            public then<S>(fn: (value: T) => Horseman & HorsemanPromise<S>): Horseman & HorsemanPromise<S>;
            public then<S>(fn: (value: T) => S): HorsemanPromise<S>;
            public then<S>(fn: (value: T) => Promise<S>): HorsemanPromise<S>;
            public then(fn: (value: T) => void): Horseman & HorsemanPromise<T>;
        }
    }

    /** horseman lets you run phantomjs from node */
    class Horseman
    {
        /**
         * creates new instance of `Horseman`
         * @param {IHorsemanOptions} options options used for creating new instance
         */
        public constructor(options?: Horseman.IHorsemanOptions);

        /**
         * send GET request to `url`
         * @param {string} url url to send request to
         */
        public open(url: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * send POST request to `url` with `postData`
         * @param {string} url url to send request to
         * @param {any} postData data to send
         */
        public post(url: string, postData: any): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * send PUT request to `url` with `putData`
         * @param {string} url url to send request to
         * @param {any} putData data to send
         */
        public put(url: string, putData: any): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * set the user agent used by phantomjs
         * @param {string} value user agent to be used by phantomjs
         */
        public userAgent(value: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * set the `headers` used when requesting a page
         * @param {any} headers headers to use in request
         */
        public headers(headers: any): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * set the `user` and `password` for accessing a web page using basic authentication
         * @param {string} user username
         * @param {string} password password
         */
        public authentication(user: string, password: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * set the `width` and `height` of viewport
         * @param {number} width viewport width
         * @param {number} height viewport height
         */
        public viewport(width: number, height: number): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * attach `callback` to page event, evaluated on phantomjs
         * @param {string} event page event
         * @param {Function} callback callback invoked on event
         */
        public at(event: 'confirm', callback: ((message: string) => boolean)): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * attach `callback` to page event, evaluated on phantomjs
         * @param {string} event page event
         * @param {Function} callback callback invoked on event
         */
        public at(event: 'prompt', callback: ((message: string, defaultValue: string) => boolean)): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * attach `callback` to page event, evaluated on phantomjs
         * @param {string} event page event
         * @param {Function} callback callback invoked on event
         */
        public at(event: 'filePicker', callback: ((oldFile: string) => boolean)): (Horseman.HorsemanPromise<void> & Horseman);

        /** closes the Horseman instance and shuts down PhantomJS */
        public close(): (Horseman.HorsemanPromise<void>);

        /** go back to the previous page */
        public back(): (Horseman.HorsemanPromise<void> & Horseman);

        /** go forward to next page */
        public forward(): (Horseman.HorsemanPromise<void> & Horseman);

        /** the http status code returned for the request */
        public status(): (Horseman.HorsemanPromise<number> & Horseman);

        /** refresh the current page */
        public reload(): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * sets `cookie` for page
         * @param {ICookie} cookie cookie to set
         */
        public cookies(cookie: Horseman.ICookie): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * sets `cookies` for page
         * @param {ICookie[]} cookies 
         */
        public cookies(cookies: Horseman.ICookie[]): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * sets cookies for page from cookie `file`
         * @param {string} file file with cookies
         */
        public cookies(file: string): (Horseman.HorsemanPromise<void> & Horseman);

        /** retrieve cookies from page */
        public cookies(): (Horseman.HorsemanPromise<Horseman.ICookie[]> & Horseman);

        /**
         * scroll to a position on the page
         * @param {number} top offset from top edge of the document
         * @param {number} left offset from left edge of the document
         */
        public scrollTo(top: number, left: number): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * set the amount of zoom `factor` on a page
         * @param {number} factor zoom factor to set
         */
        public zoom(factor: number): (Horseman.HorsemanPromise<void> & Horseman);

        /** get the title of the page */
        public title(): (Horseman.HorsemanPromise<string> & Horseman);

        /** get the url of the current page */
        public url(): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * determines if `selector` element is visible
         * @param {string} selector selector
         */
        public visible(selector: string): (Horseman.HorsemanPromise<boolean> & Horseman);

        /**
         * determines if the `selector` element exists on the page
         * @param {string} selector selector
         */
        public exists(selector: string): (Horseman.HorsemanPromise<boolean> & Horseman);

        /**
         * counts the number of `selector` elements on the page
         * @param {string} selector selector
         */
        public count(selector: string): (Horseman.HorsemanPromise<number> & Horseman);

        /** returns html of whole page */
        public html(): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * returns html of `selector` element
         * @param {string} selector selector
         */
        public html(selector: string): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * writes html of `selector` to `file`
         * @param {string} selector selector
         * @param {string} file filename
         */
        public html(selector: string, file: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * gets the text inside of an `selector` element
         * @param {string} selector selector
         */
        public text(selector: string): (Horseman.HorsemanPromise<string> & Horseman);

        /** gets the plain text of the whole page */
        public plainText(): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * gets value of `selector`
         * @param {string} selector selector
         */
        public value(selector: string): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * sets `value` of `selector`
         * @param {string} selector selector
         * @param {string} value value
         */
        public value(selector: string, value: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * gets an `attribute` of a `selector` element
         * @param {string} selector selector
         * @param {string} attribute attributee name
         */
        public attribute(selector: string, attribute: string): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * gets a css property
         * @param {string} selector selector
         * @param {string} property property name
         */
        public cssProperty(selector: string, property: string): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * gets the `width` of an element
         * @param {string} selector selector
         */
        public width(selector: string): (Horseman.HorsemanPromise<number> & Horseman);

        /**
         * gets the `height` of an element
         * @param {string} selector selector
         */
        public height(selector: string): (Horseman.HorsemanPromise<number> & Horseman);

        /**
         * clicks the `selector` element once
         * @param {string} selector selector
         */
        public click(selector: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * sets the value of `selector` eement to `value`
         * @param {string} selector selector
         * @param {string} value value
         */
        public select(selector: string, value: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * sets the value of `selector` element to ''
         * @param {string} selector selector
         */
        public clear(selector: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * enters the `text` into `selector` element with `options`
         * @param {string} selector selector
         * @param {string} text text to type
         * @param {ITypeOptions} options options containing `eventType` and `modifiers`
         */
        public type(selector: string, text: string, options?: Horseman.ITypeOptions): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * specify the `path` to upload into a file input `selector` element
         * @param {string} selector selector
         * @param {string} path filename to upload
         */
        public upload(selector: string, path: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * download the contents of `url`
         * @param {string} url url to download
         */
        public download(url: string): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * download the contents of `url` as string
         * @param {string} url url to download
         * @param {false} binary true to get as binary buffer, otherwise false
         */
        public download(url: string, binary?: false): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * download the contents of 'url' as binary buffer
         * @param {string} url url to download
         * @param {true} binary true to get as binary buffer, otherwise false
         */
        public download(url: string, binary: true): (Horseman.HorsemanPromise<ArrayBuffer> & Horseman);

        /**
         * download the contents of `url` to file at `path`
         * @param {string} url url to download
         * @param {string} path filename to save `url` contents to
         */
        public download(url: string, path: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * inject a js file onto the page
         * @param {string} file js file to inject
         */
        public injectJs(file: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * include an external js script on the page via url
         * @param {string} url url of js file to include
         */
        public includeJs(url: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * send a mouse event to the page
         * @param {IMouseEventType} type event type
         */
        public mouseEvent(type: Horseman.IMouseEventType): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * send a mouse event to the page
         * @param {IMouseEventType} type event type
         * @param {number} x event position along x axis
         * @param {number} y event position along y axis
         */
        public mouseEvent(type: Horseman.IMouseEventType, x: number, y: number): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * send a mouse event to the page
         * @param {IMouseEventType} type event type
         * @param {number} x event position along x axis
         * @param {number} y event position along y axis
         * @param {string} button event button
         */
        public mouseEvent(type: Horseman.IMouseEventType, x: number, y: number, button: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * send a keyboard event to the page
         * @param {IKeyboardEventType} type event type
         * @param {number} key event key, should be a numberical value from [this page](https://github.com/ariya/phantomjs/commit/cab2635e66d74b7e665c44400b8b20a8f225153a)
         * @param {number} modifier modifier like ctrl or shift
         */
        public keyboardEvent(type: Horseman.IKeyboardEventType, key: number, modifier?: number): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * wait for `ms` miliseconds
         * @param {number} ms ms
         */
        public wait(ms: number): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * wait until a page finishes loading
         * @param {Object} options options
         */
        public waitForNextPage(options?: { timeout: number }): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * wait until the element `selector` is present
         * @param {string} selector selector
         * @param {Object} options options
         */
        public waitForSelector(selector: string, options?: { timeout: number }): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * wait until `fn` evaluted on the page returns the specified value
         * @param {Function} fn fn to evaluate
         * @param {any} argsAndValue arguments for `fn` and value
         */
        public waitFor<T>(fn: ((...args: Array<any>) => T), ...argsAndValue: Array<(any | T)>): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * wait until `fn` evaluted on the page returns `value`
         * @param {Object} options options containing `fn` to evalute, `args` passed to it and `value`
         */
        public waitFor<T>(options:
            {
                fn: ((...args: Array<any>) => T),
                args: Array<any>,
                value: T
            }): (Horseman.HorsemanPromise<void> & Horseman);

        /** gets name of the current frame */
        public frameName(): (Horseman.HorsemanPromise<string> & Horseman);

        /** gets number of frames inside the current frame */
        public frameCount(): (Horseman.HorsemanPromise<number> & Horseman);

        /** gets names of frames inside the current frame */
        public frameNames(): (Horseman.HorsemanPromise<Array<string>> & Horseman);

        /** switch to the frame that is in focus */
        public switchToFocusedFrame(): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * switch to frame sepcified by `name`
         * @param {string} name name
         */
        public switchToFrame(name: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * switch to frame at `position`
         * @param {Object} position frame position
         */
        public switchToFrame(position: { x: number, y: number }): (Horseman.HorsemanPromise<void> & Horseman);

        /** switch to the main frame */
        public switchToMainFrame(): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * switch to parent frame of the current frame
         * @returns true if switched frames, otherwise false
         * */
        public switchToParentFrame(): (Horseman.HorsemanPromise<boolean> & Horseman);

        /**
         * open a url in a new tab, fires a `tabCreated` event
         * @param {string} url url to open
         */
        public openTab(url: string): (Horseman.HorsemanPromise<void> & Horseman);

        /** gets the number of tabs currently open */
        public tabCount(): (Horseman.HorsemanPromise<number> & Horseman);

        /**
         * switch to another tab
         * @param {number} index tab index
         */
        public switchToTab(index: number): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * close an open tan
         * @param {number} index tab index
         */
        public closeTab(index: number): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * saves a screenshot of the current page to file
         * @param {string} path filename
         */
        public screenshot(path: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * saves a screenshot of the current page as a base64 encoded string
         * @param {IImageType} type image type
         */
        public screenshotBase64(type: Horseman.IImageType): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * takes a screenshot of the current page cropped to element
         * @param {string} selector element selector to crop to
         * @param {string} path filename to save screenshot to
         */
        public crop(selector: string, path: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * takes a screenshot of the current page cropped to area
         * @param {IArea} area area to crop to
         * @param {string} path filename to save screenshot to
         */
        public crop(area: Horseman.IArea, path: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * saves a screenshot of the current page as a base64 encoded string cropped to element
         * @param {string} selector element selector to crop to
         * @param {IImageType} type image type
         */
        public cropBase64(selector: string, type: Horseman.IImageType): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * saves a screenshot of the current page as a base64 encoded string cropped to are
         * @param {IArea} area area to crop to
         * @param {IImageType} type image type
         */
        public cropBase64(area: Horseman.IArea, type: Horseman.IImageType): (Horseman.HorsemanPromise<string> & Horseman);

        /**
         * renders the page as a pdf
         * @param {string} path filename to save pdf to
         * @param {IPaperSize} paperSize pdf page size
         */
        public pdf(path: string, paperSize?: (Horseman.IPaperSizeCustom & Horseman.IPaperSizeFormat)): (Horseman.HorsemanPromise<void> & Horseman);

        /** outputs the result of the last call in the chain */
        public log(): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * outputs message without breaking the chain
         * @param {string} message message to output
         */
        public log(message: string): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * run a function without breaking the chain
         * @param {Function} fn function to invoke
         */
        public do(fn: ((done: (() => void)) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /**
         * invokes `fn` on the page width `args`
         * @param {Function} fn function to invoke
         * @param {Object} args arguments passed to `fn`
         */
        public evaluate<T>(fn: (() => T), ...args: Array<any>): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'initialized', callback: (() => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'loadStarted', callback: (() => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'loadFinished', callback: ((status: number) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'tabCreated', callback: ((tab: number) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'tabClosed', callback: ((tab: number) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'urlChanged', callback: ((targetUrl: string) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'navigationRequested', callback: ((url: string, type: string, willNavigate: boolean, main: any) => void)): (Horseman.HorsemanPromise<void> & Horseman); // TODO: What is main?

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'resourceRequested', callback: ((requestData: any, networkRequest: any) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'resourceReceived', callback: ((response: any) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'consoleMessage', callback: ((message: string, lineNumber: number, sourceId: string) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'alert', callback: ((message: string) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'confirm', callback: ((message: string) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'prompt', callback: ((message: string, defaultValue: string) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'error', callback: ((message: string, trace: any) => void)): (Horseman.HorsemanPromise<void> & Horseman);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'timeout', callback: ((message: string) => void)): (Horseman.HorsemanPromise<void> & Horseman);
    }

    export = Horseman;
}
