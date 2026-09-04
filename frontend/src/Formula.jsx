import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function Formula({ children, display = false }) {
  const math = String(children).trim();

  return display ? (
    <div className="formula-block" aria-label="Fórmula matemática">
      <BlockMath math={math} />
    </div>
  ) : (
    <InlineMath math={math} />
  );
}

export default Formula;
