import type { MarkdownOptions } from 'vitepress'

type LanguageInput = NonNullable<MarkdownOptions['languages']>[number]

/**
 * LogQL (Grafana Loki) grammar for Shiki, which ships none.
 *
 * Covers what the synced docs use: stream selectors, label matchers, line
 * filters, parser and formatting stages, range vectors and metric functions.
 * Reference: https://grafana.com/docs/loki/latest/query/
 */
export const logql = {
  name: 'logql',
  displayName: 'LogQL',
  scopeName: 'source.logql',
  patterns: [
    { include: '#comment' },
    { include: '#string' },
    { include: '#selector' },
    { include: '#range' },
    { include: '#filter-operator' },
    { include: '#label-matcher' },
    { include: '#keyword' },
    { include: '#function' },
    { include: '#number' },
    { include: '#operator' },
    { include: '#pipe' },
  ],
  repository: {
    comment: {
      match: '#.*$',
      name: 'comment.line.number-sign.logql',
    },
    string: {
      patterns: [
        {
          begin: '"',
          end: '"',
          name: 'string.quoted.double.logql',
          patterns: [{ match: '\\\\.', name: 'constant.character.escape.logql' }],
        },
        { begin: '`', end: '`', name: 'string.quoted.raw.logql' },
      ],
    },
    // {namespace="apps", job=~"traefik.*"}
    selector: {
      begin: '\\{',
      end: '\\}',
      beginCaptures: { '0': { name: 'punctuation.definition.selector.begin.logql' } },
      endCaptures: { '0': { name: 'punctuation.definition.selector.end.logql' } },
      name: 'meta.selector.logql',
      patterns: [
        { include: '#string' },
        { match: '=~|!~|!=|=', name: 'keyword.operator.matcher.logql' },
        { match: '[A-Za-z_][A-Za-z0-9_]*', name: 'variable.other.label.logql' },
        { match: ',', name: 'punctuation.separator.logql' },
      ],
    },
    // [5m], [1h30m]
    range: {
      match: '\\[\\s*(?:[0-9]+(?:ms|s|m|h|d|w|y))+\\s*\\]',
      name: 'constant.numeric.duration.logql',
    },
    // |= "error"   |~ "4\\d\\d"   != "debug"   !~ "..."
    'filter-operator': {
      match: '\\|=|\\|~|!=|!~',
      name: 'keyword.operator.filter.logql',
    },
    // level="error" after a stage
    'label-matcher': {
      match: '\\b([A-Za-z_][A-Za-z0-9_]*)\\s*(=~|!~|!=|==|=|<=|>=|<|>)',
      captures: {
        '1': { name: 'variable.other.label.logql' },
        '2': { name: 'keyword.operator.matcher.logql' },
      },
    },
    keyword: {
      match:
        '\\b(?:json|logfmt|pattern|regexp|unpack|unwrap|line_format|label_format|decolorize|drop|keep|offset|by|without|on|ignoring|group_left|group_right|bool|and|or|unless)\\b',
      name: 'keyword.control.logql',
    },
    function: {
      match:
        '\\b(?:rate|rate_counter|count_over_time|bytes_rate|bytes_over_time|absent_over_time|sum_over_time|avg_over_time|max_over_time|min_over_time|first_over_time|last_over_time|stdvar_over_time|stddev_over_time|quantile_over_time|sum|avg|min|max|stddev|stdvar|count|topk|bottomk|sort|sort_desc|label_replace|vector|bytes|duration|duration_seconds)\\b(?=\\s*\\()',
      name: 'support.function.logql',
    },
    number: {
      match: '\\b[0-9]+(?:\\.[0-9]+)?(?:ms|s|m|h|d|w|y|[KMGTP]i?B|B)?\\b',
      name: 'constant.numeric.logql',
    },
    operator: {
      match: '==|!=|<=|>=|<|>|[-+*/%^]',
      name: 'keyword.operator.logql',
    },
    pipe: {
      match: '\\|',
      name: 'keyword.operator.pipe.logql',
    },
  },
} satisfies LanguageInput
