const render = (ast) => {
  const jsonStr = JSON.stringify(ast);
  return jsonStr;
};

export default render;
