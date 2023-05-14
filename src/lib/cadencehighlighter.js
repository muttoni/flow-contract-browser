import { createStarryNight } from '@wooorm/starry-night'
import sourceCadence from '@wooorm/starry-night/lang/source.cadence'
import { toHtml } from 'hast-util-to-html'
import { detectAndAddAnchorLinksToAccounts } from '$lib/utils'

class CadenceHighlighter {
  constructor() {
    this.sourceCadence = sourceCadence;
    this.starryNight = null;
    this.isInstanceReady = false;
    this.createInstance();
  }

  async createInstance() {
    const onigurumaUrl = new URL('/onig.wasm', window.location.href);
    this.starryNight = await createStarryNight([this.sourceCadence], { 
        getOnigurumaUrlFetch : () => onigurumaUrl
      },
    );
    this.isInstanceReady = true;
  }

  async highlightCode(code) {
    if (!this.isInstanceReady) {
      await this.waitForInstanceReady();
    }

    const tree = this.starryNight.highlight(code, 'source.cadence');
    const html = toHtml(tree);
    return html;
  }

  async processCode(code, link = false) {
    const html = await this.highlightCode(code);

    if (link) {
      return detectAndAddAnchorLinksToAccounts(html);
    }

    return html;
  }

  waitForInstanceReady() {
    return new Promise((resolve) => {
      const checkInstanceReady = () => {
        if (this.isInstanceReady) {
          resolve();
        } else {
          setTimeout(checkInstanceReady, 10);
        }
      };
      checkInstanceReady();
    });
  }
}

export default new CadenceHighlighter()