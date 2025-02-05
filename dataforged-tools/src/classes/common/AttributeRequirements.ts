/* eslint-disable @typescript-eslint/naming-convention */
import _ from "lodash-es";
import type { AttributeKey, AttributeValue, IAttributeChoices } from "@json_out/index.js";
import type { AttributeHash } from "@utils/types/AttributeHash.js";


/**
 * @internal
 */
export class AttributeRequirements extends Array<IAttributeChoices> {
  constructor(json: AttributeHash) {
    super();
    _.forEach<AttributeHash<AttributeKey>>(json, (value, key) => {
      let values;
      if (Array.isArray(value)) {
        values = value;
      } else if (value !== null) {
        values = [value];
      }
      const Key = key as AttributeKey;
      const Values = values as AttributeValue<typeof Key>[];
      this.push( { Key, Values });
    });
  }
}