import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { map } from 'rxjs';
import { AUDIENCES, SITE } from '../../data/site';

type Status = 'idle' | 'sending' | 'sent' | 'error';

/**
 * Access / contact form. Submissions are handled by Netlify Forms: the prerendered HTML contains
 * the form (data-netlify="true"), so Netlify registers it at deploy time.
 */
@Component({
  selector: 'app-contact',
  imports: [RouterLink],
  templateUrl: './contact.html',
  styleUrl: './contact.scss',
})
export class Contact {
  protected readonly site = SITE;
  protected readonly audiences = AUDIENCES;
  protected readonly status = signal<Status>('idle');

  private readonly za = toSignal(inject(ActivatedRoute).queryParamMap.pipe(map((p) => p.get('za'))), {
    initialValue: null,
  });
  protected readonly preselected = computed(() => this.za() ?? '');

  protected async send(event: SubmitEvent): Promise<void> {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    if (!form.checkValidity()) {
      form.reportValidity();
      return;
    }
    this.status.set('sending');
    const data = new FormData(form);
    const body = new URLSearchParams();
    data.forEach((v, k) => body.append(k, String(v)));
    try {
      const res = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: body.toString(),
      });
      if (!res.ok) throw new Error(String(res.status));
      this.status.set('sent');
      form.reset();
    } catch {
      this.status.set('error');
    }
  }
}
