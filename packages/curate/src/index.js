import categorise from './categorise';
import simplify from './simplify';

export default ast => simplify(categorise(ast));
