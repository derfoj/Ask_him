export function parseMarkdown(text) {
  if (!text) return '';

  let html = text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/<u>(.+?)<\/u>/g, '<u>$1</u>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" class="max-w-full h-auto rounded-lg my-2" />')
    .replace(/\n/g, '<br />');

  return html;
}
