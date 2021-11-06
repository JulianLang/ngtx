import { Component } from '@angular/core';
import { NgtxApi, NgtxElement, NgtxMultiElement } from '../../entities';
import { ngtx } from '../../ngtx';
import { Expect } from '../shared/expect';
import { configureTestModule } from '../shared/util';

@Component({
  template: `
    <table>
      <tr data-ngtx="header-row">
        <th>Name</th>
      </tr>
      <tr data-ngtx="data-row">
        <td>Hans</td>
      </tr>
      <tr data-ngtx="data-row">
        <td>Anna</td>
      </tr>
    </table>
  `,
})
class TestComponent {}

describe(
  'NgtxElement: withApi',
  ngtx(({ useFixture, get }) => {
    configureTestModule(TestComponent, useFixture);

    @NgtxApi()
    class Get {
      static Header() {
        return get('ngtx_header-row').withApi(RowApi);
      }
    }

    @NgtxApi()
    class RowApi extends NgtxElement {
      Cell() {
        return this.get('th');
      }
    }

    it('should be able to use attached api', () => {
      // arrange, act
      const th = Get.Header().Cell();
      // assert
      Expect.element(th).toBeHtmlElement(HTMLTableCellElement);
    });
  }),
);

describe(
  'NgtxMultiElement: withApi',
  ngtx(({ useFixture, get, getAll }) => {
    configureTestModule(TestComponent, useFixture);

    @NgtxApi()
    class Get {
      static DataRows() {
        return getAll('ngtx_header-row').withApi(RowApi);
      }
    }

    @NgtxApi()
    class RowApi extends NgtxMultiElement {
      Cell() {
        return this.get('td');
      }
    }

    it('should be able to use attached api', () => {
      // arrange, act
      const cells = Get.DataRows().Cell();
      // assert
      cells.forEach((td) =>
        Expect.element(td).toBeHtmlElement(HTMLTableCellElement),
      );
    });
  }),
);
