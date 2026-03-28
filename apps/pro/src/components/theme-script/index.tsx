export function ThemeScript() {
  const script = `
    (function() {
      try {
        var t = localStorage.getItem('ty-theme') || 'light';
        document.documentElement.setAttribute('data-tiny-theme', t);
      } catch(e) {}
    })();
  `;
  return <script dangerouslySetInnerHTML={{ __html: script }} />;
}
