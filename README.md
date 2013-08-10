form_clone
==========

form_clone.js is a very simple and lightweight widget that allows you to clone a group of form elements quickly.

It can be extended and modified easily.
Below is an example of the HTML structure and how to use it.

## HTML form structure

```html
<div id="unique-id">
	<div class="clone-group">
		<div class="clone-template">
			<input>
			<input>
		</div>
	</div>
	<div class="btn-clone"><a href="#">Add</a></div>
</div>
```

## How to Use

```js
<script type="text/javascript">
$('#unique-id').form_clone({
	remBtnLabel: 'Remove',
	afterClone: function() {
	  md2_artist_contract_status(0);
	}
});
</script>
```