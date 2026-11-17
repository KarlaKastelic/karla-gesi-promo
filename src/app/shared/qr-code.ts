import { Component, computed, input } from '@angular/core';
import { create } from 'qrcode';

/** Crisp, print-ready QR code drawn as a single SVG path (no innerHTML). */
@Component({
  selector: 'app-qr',
  template: `
    <svg
      [attr.viewBox]="'0 0 ' + (qr().size + 8) + ' ' + (qr().size + 8)"
      role="img"
      [attr.aria-label]="'QR koda za ' + value()"
      shape-rendering="crispEdges"
    >
      <rect [attr.width]="qr().size + 8" [attr.height]="qr().size + 8" fill="#fff" />
      <path [attr.d]="qr().path" fill="#111827" />
    </svg>
  `,
  styles: `:host { display: block; } svg { width: 100%; height: auto; }`,
})
export class QrCode {
  readonly value = input.required<string>();

  protected readonly qr = computed(() => {
    const { modules } = create(this.value(), { errorCorrectionLevel: 'M' });
    const size = modules.size;
    let path = '';
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if (modules.get(y, x)) path += `M${x + 4} ${y + 4}h1v1h-1z`;
      }
    }
    return { size, path };
  });
}
