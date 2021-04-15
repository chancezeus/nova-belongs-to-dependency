<?php

namespace Webparking\BelongsToDependency;

use Laravel\Nova\Fields\BelongsTo;
use Laravel\Nova\Fields\ID;
use Laravel\Nova\Http\Requests\NovaRequest;

class BelongsToDependency extends BelongsTo
{
    /**
     * The field's component.
     *
     * @var string
     */
    public $component = 'belongs-to-dependency';

    /** @var string */
    private $tableKey;

    /** @var string */
    private $fieldKey;

    /** @var bool */
    private $requireDependency;

    // /**
    //  * Resolve the field's value.
    //  * This overrides the default function to fix the eager-loading issue:
    //  * https://github.com/laravel/nova-issues/issues/246#issuecomment-452390026
    //  *
    //  * @param mixed $resource
    //  * @param string|null $attribute
    //  * @return void
    //  */
    // public function resolve($resource, $attribute = null)
    // {
    //     $value = null;
    //
    //     if ($resource->relationLoaded($this->attribute)) {
    //         $value = $resource->getRelation($this->attribute);
    //     }
    //
    //     if (! $value) {
    //         $value = $resource->{$this->attribute}()->withoutGlobalScopes()->setEagerLoads([])->getResults();
    //     }
    //
    //     if ($value) {
    //         $resource = new $this->resourceClass($value);
    //
    //         $this->belongsToId = optional(ID::forResource($resource))->value ?? $value->getKey();
    //
    //         $this->value = $this->formatDisplayValue($resource);
    //
    //         $this->viewable = $this->viewable
    //             && $resource->authorizedToView(request());
    //     }
    // }

    /**
     * Build an associatable query for the field.
     * Here is where we add the depends on value and filter results
     *
     * @param \Laravel\Nova\Http\Requests\NovaRequest $request
     * @param bool $withTrashed
     * @return \Laravel\Nova\Query\Builder
     */
    public function buildAssociatableQuery(NovaRequest $request, $withTrashed = false)
    {
        return parent::buildAssociatableQuery($request, $withTrashed)
            ->tap(function ($query) use ($request) {
                if ($request->has('dependsOnValue') || $request->has($this->fieldKey) || $this->requireDependency) {
                    $query->where(
                        $this->tableKey,
                        $request->input('dependsOnValue') ?? $request->input($this->fieldKey) ?: null
                    );
                }
            });
    }

    /**
     * Set the depends on field and depends on key
     *
     * @param string $dependsOnField
     * @param string $tableKey
     * @param $requireDependency
     * @return $this
     */
    public function dependsOn(string $dependsOnField, string $tableKey, bool $requireDependency = false): self
    {
        $this->fieldKey = $dependsOnField;
        $this->tableKey = $tableKey;
        $this->requireDependency = $requireDependency;

        return $this->withMeta(['dependsOn' => $dependsOnField]);
    }
}
