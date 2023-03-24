import {LitElement, css, html} from 'lit';
import {customElement, property} from 'lit/decorators.js';
import { parse } from 'csv-parse/sync';

@customElement('mayor-table')
export class MayorTable extends LitElement {

  @property({type: String})
  public data: string;

  @state()
  protected _headings: [];

  @state()
  protected _rows: [];

  constructor() {
    super();
    trows = parse(data, {
      delimiter: ',',
      trim: true,
    });

    headings = trows.shift();
    headings.forEach(function(value) {
      re = /[^\p{L}\p{M}]/gi; 
      _headings.push(value.replace(re,''));
      console.log(`original value was ${value}, new value is ${_headings[_headings.indexOf()]}\n`);
    });

    _rows = trows;

  }

  render() {
    $hrow = "<bx-table-header-row>\n";
    _headings.forEach(function (value) {
      $hrow = `${hrow}<bx-table-header-cell data-column-id="${value}">\n`;
    });
    $hrow = `${hrow}</bx-table-header-row>\n`;
    return html`
      <bx-data-table @bx-table-header-cell-sort=\${handleChangeSort} >
       <bx-table>
        <bx-table-head>
          ${hrow}
        </bx-table-head>
       <bx-table-body>
       </bx-table-body>
      </bx-table>
     </bx-data-table>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    "mayor-table": MayorTable;
  }
}

// vim: shiftwidth=2:tabstop=2:expandtab

