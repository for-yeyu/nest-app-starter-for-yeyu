/* eslint-disable */
export default async () => {
    const t = {};
    return { "@nestjs/swagger": { "models": [[import("./module/cat/dto/create-cat.dto"), { "CreateCatDto": {} }], [import("./module/cat/dto/update-cat.dto"), { "UpdateCatDto": {} }]], "controllers": [[import("./app.controller"), { "AppController": { "getHello": { type: String } } }], [import("./module/cat/cat.controller"), { "CatController": { "create": { type: Object }, "findAll": { type: [Object] }, "findOne": { type: Object }, "update": { type: Object }, "remove": { type: Object } } }]] } };
};