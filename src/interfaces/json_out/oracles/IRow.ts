import type { IAttributeChoices } from "@dataforged/interfaces/json_out/common/IAttributeChoices.js";
import type { IDisplay } from "@dataforged/interfaces/json_out/common/IDisplay.js";
import type { IHasDisplay, IHasGameObjects, IHasOracleContent, IHasRollTemplate, IHasSubtable, IHasSuggestions, IHasSummary } from "@dataforged/interfaces/json_out/common/IHas.js";
import type { IMultipleRolls } from "@dataforged/interfaces/json_out/oracles/IMultipleRolls.js";
import type { SettingTruthOptionId } from "@dataforged/interfaces/json_out/setting_truths/ISettingTruthOption.js";
import type { OracleTableId } from "@dataforged/strings/id/OracleTableId.js";
import type { OracleTableRowId } from "@dataforged/strings/id/OracleTableRowId.js";
import type { FragmentString, SentenceString, TermString } from "@dataforged/strings/MdString.js";

/**
 * Display properties for a single row in an oracle table.
 */
export type IRowDisplay = Omit<IDisplay, "Title">;

/**
 * Interface representing a single row in an oracle table.
 */
export interface IRow extends Partial<
  IHasSummary &
  IHasRollTemplate<"Result" | "Summary" |"Description"> &
  IHasSuggestions &
  IHasDisplay<IRowDisplay> &
  IHasOracleContent &
  IHasSubtable &
  IHasGameObjects
>  {
  // FIXME: refactor for external use

  $id?: SettingTruthOptionId | OracleTableRowId | null;
  /**
   * The low end of the dice range for this row.
   */
  Floor: number|null;
  /**
   * The high end of the dice range for this row.
   */
  Ceiling: number|null;
  /**
   * The primary result text for the row, annotated in Markdown.
   * In the book, this is frequently the only column aside from the roll column. Otherwise, it is the first column.
   * Some tables label this column as something other than Result; see the parent (or grandparent) Oracle.Display for more information.
   */
  Result: TermString | FragmentString | SentenceString;
  /**
   * A secondary markdown string that must be presented to the user for the implementation to be complete, but may benefit from progressive disclosure (such as a collapsible element, popover/tooltip, etc).
   * Some tables label this column as something other than Result; see the parent (or grandparent) Oracle.Display for more information.
   */
  Summary?: SentenceString | FragmentString | undefined;

  /**
   * Additional oracle tables that should be rolled when this row is selected.
   */
  "Oracle rolls"?: OracleTableId[] | undefined;
  /**
   * A table to be rolled when this row is selected. If this row references an external oracle, the `Oracles` property is used instead.
   */
  Subtable?: IRow[] | undefined;
  /**
   * Data for rows that call for multiple rolls, e.g. on `Roll twice` results.
   */
  "Multiple rolls"?: IMultipleRolls | undefined;
  /**
  * The attributes set by this row.
   */
  Attributes?: IAttributeChoices[] | undefined;
}