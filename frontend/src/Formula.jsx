import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

function Formula({ children, display = false }) {
  const math = String(children).trim();

  return display ? (
    <div className="formula-block notranslate" aria-label="Fórmula matemática" translate="no">
      <BlockMath math={math} />
    </div>
  ) : (
    <span className="notranslate" translate="no">
      <InlineMath math={math} />
    </span>
  );
}

export default Formula;
