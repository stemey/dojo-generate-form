define([
    './QueryFactory',
    'dojo/topic',
    'dojo/aspect',
    'gridx/modules/SingleSort',
    'gridx/Grid',
    'gridx/core/model/cache/Async',
    'gridx/core/model/cache/Sync',
    '../model/DerivedModel',
    "dojo/_base/declare",
    'gridx/modules/select/Row'
], function (QueryFactory, topic, aspect, SingleSort, Grid, Async, Sync, DerivedModel, declare, RowSelect) {

    return declare(null, {
        id: "query-ref",
        handles: function (attribute) {
            return true;
        },
        createModel: function (attribute) {
            return new DerivedModel();

        },
        create: function (attribute, model, ctx) {
            var store = ctx.getStore(attribute.store);
            var idProperty = store.idProperty;
            var props = {};
            props.store = store;
            props.structure = attribute.gridColumns.map(function(name) {
                return {
                    id:name,
                    name:name,
                    field:name
                }
            });
            props.cacheClass = true ? Sync : Async;
            props.style = {width: "100%"};
            props.query = model.query;
            props.baseSort = attribute.sort;
            props.modules = [
                //Declare sort module in the "modules" parameter.
                SingleSort,
                {
                    moduleClass: RowSelect,
                    multiple: false,
                    triggerOnCell: true
                }
            ]
            function createCtx(m) {
                return {
                    getValue: function () {
                        return m.getPlainValue();
                    },
                    getParent: function () {
                        return m.getParentModel()!==null ? createCtx(m.getParentModel()) : null;
                    }
                }
            }

            props.queryFactory = new QueryFactory({attribute: attribute, ctx: createCtx(model.parent)})


            var grid = new Grid(props);

            function updateQuery() {
                var query = grid.queryFactory.create();
                grid.model.query(query);
                grid.body.refresh();
            }

            grid.own(aspect.after(model.parent, "onChange", updateQuery));
            aspect.after(grid, "startup", function () {
                updateQuery();
                grid.connect(grid, 'onRowClick', function (e) {
                    var id = grid.select.row.getSelected();
                    topic.publish("/focus", {store: attribute.store, id: id, source: null})
                });
            });

            return grid;
        }
    });
});
