import { FormEvent, useState } from 'react';

type EnquiryFormProps = {
  partnership?: boolean;
};

export default function EnquiryForm({ partnership = false }: EnquiryFormProps) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus('sending');
    setMessage('');

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...values, enquiryType: partnership ? 'Partnership enquiry' : 'General enquiry' }),
      });
      const contentType = response.headers.get('content-type') || '';
      const result = contentType.includes('application/json')
        ? await response.json() as { message?: string }
        : { message: 'The enquiry service returned an unexpected response. Please try again or call us on 01273 473737.' };
      if (!response.ok) throw new Error(result.message || 'We could not send your enquiry.');
      form.reset();
      setStatus('success');
      setMessage('Thanks — your enquiry has been sent. We will be in touch shortly.');
    } catch (error) {
      setStatus('error');
      setMessage(error instanceof Error ? error.message : 'We could not send your enquiry. Please call us on 01273 473737.');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-border rounded-lg p-6 sm:p-8 text-left">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <label className="text-sm font-medium">
          Your name *
          <input name="name" required maxLength={100} className="mt-2 w-full rounded border border-input px-3 py-2" />
        </label>
        <label className="text-sm font-medium">
          Email address *
          <input type="email" name="email" required maxLength={254} className="mt-2 w-full rounded border border-input px-3 py-2" />
        </label>
        <label className="text-sm font-medium">
          Telephone
          <input name="telephone" maxLength={30} className="mt-2 w-full rounded border border-input px-3 py-2" />
        </label>
        {partnership && (
          <label className="text-sm font-medium">
            Business or organisation
            <input name="organisation" maxLength={150} className="mt-2 w-full rounded border border-input px-3 py-2" />
          </label>
        )}
      </div>
      <label className="block text-sm font-medium mt-5">
        Your message *
        <textarea name="message" required maxLength={5000} rows={6} className="mt-2 w-full rounded border border-input px-3 py-2" />
      </label>
      <label className="flex items-start gap-2 text-sm text-muted-foreground mt-5">
        <input type="checkbox" name="consent" value="true" required className="mt-1" />
        <span>I agree that Western Cars Adur may use these details to respond to my enquiry.</span>
      </label>
      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 rounded bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground hover:opacity-90 disabled:opacity-60"
      >
        {status === 'sending' ? 'Sending…' : partnership ? 'Send partnership enquiry' : 'Send enquiry'}
      </button>
      {message && (
        <p role="status" className={`mt-4 text-sm ${status === 'error' ? 'text-destructive' : 'text-success'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
