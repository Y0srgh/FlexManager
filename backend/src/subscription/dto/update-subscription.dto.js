"use strict";
// src/subscription/dto/update-subscription.dto.ts
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateSubscriptionDto = void 0;
var class_validator_1 = require("class-validator");
var UpdateSubscriptionDto = function () {
    var _a;
    var _name_decorators;
    var _name_initializers = [];
    var _name_extraInitializers = [];
    var _details_decorators;
    var _details_initializers = [];
    var _details_extraInitializers = [];
    var _price_decorators;
    var _price_initializers = [];
    var _price_extraInitializers = [];
    var _equipment_decorators;
    var _equipment_initializers = [];
    var _equipment_extraInitializers = [];
    var _benefits_decorators;
    var _benefits_initializers = [];
    var _benefits_extraInitializers = [];
    return _a = /** @class */ (function () {
            function UpdateSubscriptionDto() {
                this.name = __runInitializers(this, _name_initializers, void 0);
                this.details = (__runInitializers(this, _name_extraInitializers), __runInitializers(this, _details_initializers, void 0));
                this.price = (__runInitializers(this, _details_extraInitializers), __runInitializers(this, _price_initializers, void 0));
                this.equipment = (__runInitializers(this, _price_extraInitializers), __runInitializers(this, _equipment_initializers, void 0));
                this.benefits = (__runInitializers(this, _equipment_extraInitializers), __runInitializers(this, _benefits_initializers, void 0));
                __runInitializers(this, _benefits_extraInitializers);
            }
            return UpdateSubscriptionDto;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _name_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _details_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _price_decorators = [(0, class_validator_1.IsInt)()];
            _equipment_decorators = [(0, class_validator_1.IsString)(), (0, class_validator_1.IsNotEmpty)()];
            _benefits_decorators = [(0, class_validator_1.IsArray)(), (0, class_validator_1.IsString)({ each: true })];
            __esDecorate(null, null, _name_decorators, { kind: "field", name: "name", static: false, private: false, access: { has: function (obj) { return "name" in obj; }, get: function (obj) { return obj.name; }, set: function (obj, value) { obj.name = value; } }, metadata: _metadata }, _name_initializers, _name_extraInitializers);
            __esDecorate(null, null, _details_decorators, { kind: "field", name: "details", static: false, private: false, access: { has: function (obj) { return "details" in obj; }, get: function (obj) { return obj.details; }, set: function (obj, value) { obj.details = value; } }, metadata: _metadata }, _details_initializers, _details_extraInitializers);
            __esDecorate(null, null, _price_decorators, { kind: "field", name: "price", static: false, private: false, access: { has: function (obj) { return "price" in obj; }, get: function (obj) { return obj.price; }, set: function (obj, value) { obj.price = value; } }, metadata: _metadata }, _price_initializers, _price_extraInitializers);
            __esDecorate(null, null, _equipment_decorators, { kind: "field", name: "equipment", static: false, private: false, access: { has: function (obj) { return "equipment" in obj; }, get: function (obj) { return obj.equipment; }, set: function (obj, value) { obj.equipment = value; } }, metadata: _metadata }, _equipment_initializers, _equipment_extraInitializers);
            __esDecorate(null, null, _benefits_decorators, { kind: "field", name: "benefits", static: false, private: false, access: { has: function (obj) { return "benefits" in obj; }, get: function (obj) { return obj.benefits; }, set: function (obj, value) { obj.benefits = value; } }, metadata: _metadata }, _benefits_initializers, _benefits_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.UpdateSubscriptionDto = UpdateSubscriptionDto;
