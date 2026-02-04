|  Logo  | Device Name | Machine Name    | Architecture |             |
|:------:|-------------|-----------------|--------------|-------------|
{{#each deviceTypes}}
| <img src="../../.gitbook/assets/dt-{{this.id}}.svg" data-size="line"> | {{this.name}}   | {{this.id}} | {{this.arch}} | [Get started](../../learn/getting-started/{{this.id}}.md) |
{{/each}}