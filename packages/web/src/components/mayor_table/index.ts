import {ReactiveElement, LitElement, css, html, PropertyValues} from 'lit';
import {customElement, property, query, state} from 'lit/decorators.js';
import {asyncReplace} from 'lit/directives/async-replace.js';
import { guard } from 'lit/directives/guard.js';
import {when} from 'lit/directives/when.js';
import {ref, createRef } from 'lit/directives/ref.js';
import { until } from 'lit/directives/until.js';
import {render} from '@lit-labs/ssr';


import {csv} from 'd3';
import {autoType} from 'd3-dsv';

import '@vaadin/grid/vaadin-grid.js';
import '@vaadin/grid/vaadin-grid-selection-column.js';
import '@vaadin/grid/vaadin-grid-sort-column.js';

import * as path from 'path';

export interface Mayor {
    name: string|undefined,
    free: string|undefined,
    mrank: string|undefined,
    mgrade: string|undefined,
    mps: string|undefined,
    mns: string|undefined,
    yrank: string|undefined,
    ygrade: string|undefined,
    yps: string|undefined,
    yns: string|undefined,
    orank: string|undefined,
    ograde: string|undefined,
    ops: string|undefined,
    ons: string|undefined,
    prank: string|undefined,
    pgrade: string|undefined,
    pps: string|undefined,
    pns: string|undefined,
  };

@customElement('mayor-table')
export class MayorTable extends LitElement {

  @property({type: String, reflect: true})
  public CsvUrl: string;
  
  @state()
  protected _headings: string[];

  @state()
  protected _ids: string[];

  @state()
  private items?: Mayor[];

  @state()
  private count: number;

  constructor() {
    super();

    this.CsvUrl = '';

    this.count = 0;
    this._headings = [
      "Name",
      "Availability",
      "Maxed Out Rank",
      "Maxed Out Grade",
      "Maxed Out # Grade",
      "Maxed Out Score",
      "4 Yellows Rank",
      "4 Yellows Grade",
      "4 Yellows # Grade",
      "4 Yellows Score",
      "3 Orange Rank",
      "3 Orange Grade",
      "3 Orange # Grade",
      "3 Orange Score",
      "3 Purple Rank",
      "3 Purple Grade",
      "3 Purple # Grade",
      "3 Purple Score",
    ];

    this._ids = [
      "name",
      "free",
      "mrank",
      "mgrade",
      "mps",
      "mns",
      "yrank",
      "ygrade",
      "yps",
      "yns",
      "orank",
      "ograde",
      "ops",
      "ons",
      "prank",
      "ograde",
      "ops",
      "ons",
      "prank",
      "pgrade",
      "pps",
      "pns"
    ];
     
  }

  public connectedCallback() {
    super.connectedCallback();
    this.getMayors();
  }

  public disconnectedCallback() {
    console.log('disconnected callback');
    super.disconnectedCallback();
  }

  protected async getMayors() {
    await csv(this.CsvUrl).then((data) => {
      for(let i = 0; i < data.length; i++) {
        if (this.items === undefined) {
          this.items = new Array<Mayor>;
        }
        this.items = this.items.concat([{
            name: data[i].name,
            free: data[i].free,
            mrank: data[i].mrank,
            mgrade: data[i].mgrade,
            mps: data[i].mps,
            mns: data[i].mns,
            yrank: data[i].yrank,
            ygrade: data[i].ygrade,
            yps: data[i].yps,
            yns: data[i].yns,
            orank: data[i].orank,
            ograde: data[i].ograde,
            ops: data[i].ops,
            ons: data[i].ons,
            prank: data[i].prank,
            pgrade: data[i].pgrade,
            pps: data[i].pps,
            pns: data[i].pns
        }]);
        this.count = this.items.length;
      }
      this.requestUpdate();
    });
  }

  render() {
    const itemTemplates = [];
    for (let i = 0; i < this._headings.length; i++) {
      itemTemplates.push(html`<vaadin-grid-sort-column header="${this._headings[i]}" path="${this._ids[i]}" direction="asc"></vaadin-grid-sort-column>` );
    }
    return html`
      <vaadin-grid .items="${this.items}" theme="wrap-cell-content" >
        ${itemTemplates}
       </vaadin-grid>
    `;
  }


}

declare global {
  interface HTMLElementTagNameMap {
    "mayor-table": MayorTable;
  }
}


// vi: sw=2:ts=2:expandtab:

