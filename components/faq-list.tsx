import { ChevronDown } from 'lucide-react';

export function FaqList({ items }: { items: { question: string; answer: string }[] }) {
  return <div className="faq-list">{items.map((item) => <details className="faq-item" key={item.question}><summary><span>{item.question}</span><ChevronDown size={19} aria-hidden="true" /></summary><p>{item.answer}</p></details>)}</div>;
}
