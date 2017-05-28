/**
 * Horseman lets you run PhantomJS from Node.
 */
declare module "node-horseman"
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

    type IImageType = ('PNG' | 'GIF' | 'JPEG');

    /** horseman lets you run phantomjs from node */
    class HorsemanInit
    {
        /**
         * creates new instance of `Horseman`
         * @param {IHorsemanOptions} options options used for creating new instance
         */
        public constructor(options?: IHorsemanOptions);

        /**
         * send GET request to `url`
         * @param {string} url url to send request to
         */
        public open(url: string): (Horseman & Promise<void>);

        /**
         * send POST request to `url` with `postData`
         * @param {string} url url to send request to
         * @param {any} postData data to send
         */
        public post(url: string, postData: any): (Horseman & Promise<void>);

        /**
         * send PUT request to `url` with `putData`
         * @param {string} url url to send request to
         * @param {any} putData data to send
         */
        public put(url: string, putData: any): (Horseman & Promise<void>);

        /**
         * set the user agent used by phantomjs
         * @param {string} value user agent to be used by phantomjs
         */
        public userAgent(value: string): (HorsemanInit & Promise<void>);

        /**
         * set the `headers` used when requesting a page
         * @param {any} headers headers to use in request
         */
        public headers(headers: any): (HorsemanInit & Promise<void>);

        /**
         * set the `user` and `password` for accessing a web page using basic authentication
         * @param {string} user username
         * @param {string} password password
         */
        public authentication(user: string, password: string): (HorsemanInit & Promise<void>);

        /**
         * set the `width` and `height` of viewport
         * @param {number} width viewport width
         * @param {number} height viewport height
         */
        public viewport(width: number, height: number): (HorsemanInit & Promise<void>);

        /**
         * attach `callback` to page event, evaluated on phantomjs
         * @param {string} event page event
         * @param {Function} callback callback invoked on event
         */
        public at(event: 'confirm', callback: ((message: string) => boolean)): (Horseman & Promise<void>);

        /**
         * attach `callback` to page event, evaluated on phantomjs
         * @param {string} event page event
         * @param {Function} callback callback invoked on event
         */
        public at(event: 'prompt', callback: ((message: string, defaultValue: string) => boolean)): (Horseman & Promise<void>);

        /**
         * attach `callback` to page event, evaluated on phantomjs
         * @param {string} event page event
         * @param {Function} callback callback invoked on event
         */
        public at(event: 'filePicker', callback: ((oldFile: string) => boolean)): (Horseman & Promise<void>);

        /** closes the Horseman instance and shuts down PhantomJS */
        public close(): (Promise<void>);
    }

    class Horseman
    {
        /** go back to the previous page */
        public back(): (Horseman & Promise<void>);

        /** go forward to next page */
        public forward(): (Horseman & Promise<void>);

        /** the http status code returned for the request */
        public status(): (Horseman & Promise<number>);

        /** refresh the current page */
        public reload(): (Horseman & Promise<void>);

        /**
         * sets `cookie` for page
         * @param {ICookie} cookie cookie to set
         */
        public cookies(cookie: ICookie): (Horseman & Promise<void>);

        /**
         * sets `cookies` for page
         * @param {ICookie[]} cookies 
         */
        public cookies(cookies: ICookie[]): (Horseman & Promise<void>);

        /**
         * sets cookies for page from cookie `file`
         * @param {string} file file with cookies
         */
        public cookies(file: string): (Horseman & Promise<void>);

        /** retrieve cookies from page */
        public cookies(): (Horseman & Promise<ICookie[]>);

        /**
         * scroll to a position on the page
         * @param {number} top offset from top edge of the document
         * @param {number} left offset from left edge of the document
         */
        public scrollTo(top: number, left: number): (Horseman & Promise<void>);

        /**
         * set the amount of zoom `factor` on a page
         * @param {number} factor zoom factor to set
         */
        public zoom(factor: number): (Horseman & Promise<void>);

        /** get the title of the page */
        public title(): (Horseman & Promise<string>);

        /** get the url of the current page */
        public url(): (Horseman & Promise<string>);

        /**
         * determines if `selector` element is visible
         * @param {string} selector selector
         */
        public visible(selector: string): (Horseman & Promise<boolean>);

        /**
         * determines if the `selector` element exists on the page
         * @param {string} selector selector
         */
        public exists(selector: string): (Horseman & Promise<boolean>);

        /**
         * counts the number of `selector` elements on the page
         * @param {string} selector selector
         */
        public count(selector: string): (Horseman & Promise<number>);

        /** returns html of whole page */
        public html(): (Horseman & Promise<string>);

        /**
         * returns html of `selector` element
         * @param {string} selector selector
         */
        public html(selector: string): (Horseman & Promise<string>);

        /**
         * writes html of `selector` to `file`
         * @param {string} selector selector
         * @param {string} file filename
         */
        public html(selector: string, file: string): (Horseman & Promise<void>);

        /**
         * gets the text inside of an `selector` element
         * @param {string} selector selector
         */
        public text(selector: string): (Horseman & Promise<string>);

        /** gets the plain text of the whole page */
        public plainText(): (Horseman & Promise<string>);

        /**
         * gets value of `selector`
         * @param {string} selector selector
         */
        public value(selector: string): (Horseman & Promise<string>);

        /**
         * sets `value` of `selector`
         * @param {string} selector selector
         * @param {string} value value
         */
        public value(selector: string, value: string): (Horseman & Promise<void>);

        /**
         * gets an `attribute` of an `selector` element
         * @param {string} selector selector
         * @param {string} attribute attributee name
         */
        public attribute(selector: string, attribute: string): (Horseman & Promise<string>);

        /**
         * gets a css property
         * @param {string} selector selector
         * @param {string} property property name
         */
        public cssProperty(selector: string, property: string): (Horseman & Promise<string>);

        /**
         * gets the `width` of an element
         * @param {string} selector selector
         */
        public width(selector: string): (Horseman & Promise<number>);

        /**
         * gets the `height` of an element
         * @param {string} selector selector
         */
        public height(selector: string): (Horseman & Promise<number>);

        /**
         * clicks the `selector` element once
         * @param {string} selector selector
         */
        public click(selector: string): (Horseman & Promise<void>);

        /**
         * sets the value of `selector` eement to `value`
         * @param {string} selector selector
         * @param {string} value value
         */
        public select(selector: string, value: string): (Horseman & Promise<void>);

        /**
         * sets the value of `selector` element to ''
         * @param {string} selector selector
         */
        public clear(selector: string): (Horseman & Promise<void>);

        /**
         * enters the `text` into `selector` element with `options`
         * @param {string} selector selector
         * @param {string} text text to type
         * @param {ITypeOptions} options options containing `eventType` and `modifiers`
         */
        public type(selector: string, text: string, options?: ITypeOptions): (Horseman & Promise<void>);

        /**
         * specify the `path` to upload into a file input `selector` element
         * @param {string} selector selector
         * @param {string} path filename to upload
         */
        public upload(selector: string, path: string): (Horseman & Promise<void>);

        /**
         * download the contents of `url`
         * @param {string} url url to download
         */
        public download(url: string): (Horseman & Promise<string>);

        /**
         * download the contents of `url` as string
         * @param {string} url url to download
         * @param {false} binary true to get as binary buffer, otherwise false
         */
        public download(url: string, binary?: false): (Horseman & Promise<string>);

        /**
         * download the contents of 'url' as binary buffer
         * @param {string} url url to download
         * @param {true} binary true to get as binary buffer, otherwise false
         */
        public download(url: string, binary: true): (Horseman & Promise<ArrayBuffer>);

        /**
         * download the contents of `url` to file at `path`
         * @param {string} url url to download
         * @param {string} path filename to save `url` contents to
         */
        public download(url: string, path: string): (Horseman & Promise<void>);

        /**
         * inject a js file onto the page
         * @param {string} file js file to inject
         */
        public injectJs(file: string): (Horseman & Promise<void>);

        /**
         * include an external js script on the page via url
         * @param {string} url url of js file to include
         */
        public includeJs(url: string): (Horseman & Promise<void>);

        /**
         * send a mouse event to the page
         * @param {IMouseEventType} type event type
         */
        public mouseEvent(type: IMouseEventType): (Horseman & Promise<void>);

        /**
         * send a mouse event to the page
         * @param {IMouseEventType} type event type
         * @param {number} x event position along x axis
         * @param {number} y event position along y axis
         */
        public mouseEvent(type: IMouseEventType, x: number, y: number): (Horseman & Promise<void>);

        /**
         * send a mouse event to the page
         * @param {IMouseEventType} type event type
         * @param {number} x event position along x axis
         * @param {number} y event position along y axis
         * @param {string} button event button
         */
        public mouseEvent(type: IMouseEventType, x: number, y: number, button: string): (Horseman & Promise<void>);

        /**
         * send a keyboard event to the page
         * @param {IKeyboardEventType} type event type
         * @param {number} key event key, should be a numberical value from [this page](https://github.com/ariya/phantomjs/commit/cab2635e66d74b7e665c44400b8b20a8f225153a)
         * @param {number} modifier modifier like ctrl or shift
         */
        public keyboardEvent(type: IKeyboardEventType, key: number, modifier?: number): (Horseman & Promise<void>);

        /**
         * wait for `ms` miliseconds
         * @param {number} ms ms
         */
        public wait(ms: number): (Horseman & Promise<void>);

        /**
         * wait until a page finishes loading
         * @param {Object} options options
         */
        public waitForNextPage(options?: { timeout: number }): (Horseman & Promise<void>);

        /**
         * wait until the element `selector` is present
         * @param {string} selector selector
         * @param {Object} options options
         */
       public  waitForSelector(selector: string, options?: { timeout: number }): (Horseman & Promise<void>);

        /**
         * wait until `fn` evaluted on the page returns the specified value
         * @param {Function} fn fn to evaluate
         * @param {any} argsAndValue arguments for `fn` and value
         */
        public waitFor<T>(fn: ((...args: Array<any>) => T), ...argsAndValue: Array<(any | T)>): (Horseman & Promise<void>);

        /**
         * wait until `fn` evaluted on the page returns `value`
         * @param {Object} options options containing `fn` to evalute, `args` passed to it and `value`
         */
        public waitFor<T>(options:
        {
            fn: ((...args: Array<any>) => T),
            args: Array<any>,
            value: T
        }): (Horseman & Promise<void>);

        /** gets name of the current frame */
        public frameName(): (Horseman & Promise<string>);

        /** gets number of frames inside the current frame */
        public frameCount(): (Horseman & Promise<number>);

        /** gets names of frames inside the current frame */
        public frameNames(): (Horseman & Promise<Array<string>>);

        /** switch to the frame that is in focus */
        public switchToFocusedFrame(): (Horseman & Promise<void>);

        /**
         * switch to frame sepcified by `name`
         * @param {string} name name
         */
        public switchToFrame(name: string): (Horseman & Promise<void>);

        /**
         * switch to frame at `position`
         * @param {Object} position frame position
         */
        public switchToFrame(position: { x: number, y: number }): (Horseman & Promise<void>);

        /** switch to the main frame */
        public switchToMainFrame(): (Horseman & Promise<void>);

        /**
         * switch to parent frame of the current frame
         * @returns true if switched frames, otherwise false
         * */
        public switchToParentFrame(): (Horseman & Promise<boolean>);

        /**
         * open a url in a new tab, fires a `tabCreated` event
         * @param {string} url url to open
         */
        public openTab(url: string): (Horseman & Promise<void>);

        /** gets the number of tabs currently open */
        public tabCount(): (Horseman & Promise<number>);

        /**
         * switch to another tab
         * @param {number} index tab index
         */
        public switchToTab(index: number): (Horseman & Promise<void>);

        /**
         * close an open tan
         * @param {number} index tab index
         */
        public closeTab(index: number): (Horseman & Promise<void>);

        /**
         * saves a screenshot of the current page to file
         * @param {string} path filename
         */
        public screenshot(path: string): (Horseman & Promise<void>);

        /**
         * saves a screenshot of the current page as a base64 encoded string
         * @param {IImageType} type image type
         */
        public screenshotBase64(type: IImageType): (Horseman & Promise<void>);

        /**
         * takes a screenshot of the current page cropped to element
         * @param {string} selector element selector to crop to
         * @param {string} path filename to save screenshot to
         */
        public crop(selector: string, path: string): (Horseman & Promise<void>);

        /**
         * takes a screenshot of the current page cropped to area
         * @param {IArea} area area to crop to
         * @param {string} path filename to save screenshot to
         */
        public crop(area: IArea, path: string): (Horseman & Promise<void>);

        /**
         * saves a screenshot of the current page as a base64 encoded string cropped to element
         * @param {string} selector element selector to crop to
         * @param {IImageType} type image type
         */
        public cropBase64(selector: string, type: IImageType): (Horseman & Promise<string>);

        /**
         * saves a screenshot of the current page as a base64 encoded string cropped to are
         * @param {IArea} area area to crop to
         * @param {IImageType} type image type
         */
        public cropBase64(area: IArea, type: IImageType): (Horseman & Promise<string>);

        /**
         * renders the page as a pdf
         * @param {string} path filename to save pdf to
         * @param {IPaperSize} paperSize pdf page size
         */
        public pdf(path: string, paperSize?: (IPaperSizeCustom & IPaperSizeFormat)): (Horseman & Promise<void>);

        /** outputs the result of the last call in the chain */
        public log(): (Horseman & Promise<void>);

        /**
         * outputs message without breaking the chain
         * @param {string} message message to output
         */
        public log(message: string): (Horseman & Promise<void>);

        /**
         * run a function without breaking the chain
         * @param {Function} fn function to invoke
         */
        public do(fn: ((done: (() => void)) => void)): (Horseman & Promise<void>);

        /**
         * invokes `fn` on the page width `args`
         * @param {Function} fn function to invoke
         * @param {Object} args arguments passed to `fn`
         */
        public evaluate<T>(fn: (() => T), ...args: Array<any>): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'initialized', callback: (() => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'loadStarted', callback: (() => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'loadFinished', callback: ((status: number) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'tabCreated', callback: ((tab: number) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'tabClosed', callback: ((tab: number) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'urlChanged', callback: ((targetUrl: string) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'navigationRequested', callback: ((url: string, type: string, willNavigate: boolean, main: any) => void)): (Horseman & Promise<void>); // TODO: What is main?

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'resourceRequested', callback: ((requestData: any, networkRequest: any) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'resourceReceived', callback: ((response: any) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'consoleMessage', callback: ((message: string, lineNumber: number, sourceId: string) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'alert', callback: ((message: string) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'confirm', callback: ((message: string) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'prompt', callback: ((message: string, defaultValue: string) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'error', callback: ((message: string, trace: any) => void)): (Horseman & Promise<void>);

        /** attach `callback` to page event, evaluated on page */
        public on(event: 'timeout', callback: ((message: string) => void)): (Horseman & Promise<void>);

        /** closes the Horseman instance and shuts down PhantomJS */
        public close(): (Promise<void>);
    }

    const horseman: HorsemanInit;
    export = horseman;
}