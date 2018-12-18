import keeper from './keeper';
import reduce from './reducer';

export default ast => reduce(keeper(ast));
