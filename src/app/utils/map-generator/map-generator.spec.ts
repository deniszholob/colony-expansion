import { generateMap, initCssVars } from './map-generator';

describe('map-generator', () => {
  it('should initCssVars', () => {
    initCssVars();
    const elHtml = document.getElementsByTagName('html');
    expect(elHtml.length).toBe(1);

    // <html style="--hex-size: 55px; --hex-box-height: 31.75426480542942px; --hex-margin: 1px; --hex-v-repeat: 98.26279441628824px; --grid-x: 883.5px; --grid-y: 780.3984px;"><head /><body /></html>
    const elHtmlString = elHtml.item(0)?.outerHTML;
    expect(elHtmlString).toContain('--hex-size: 55px;');
    expect(elHtmlString).toContain('--hex-margin: 1px;');
    expect(elHtmlString).toContain('--hex-box-height: 31.75426480542942px;');
    expect(elHtmlString).toContain('--hex-v-repeat: 98.26279441628824px;');
    expect(elHtmlString).toContain('--grid-x: 883.5px;');
    expect(elHtmlString).toContain('--grid-y: 780.3984px;');
  });

  it('should generateMap', () => {
    const map = generateMap();
    expect(map.size).toBe(15 * 15);
  });
});
