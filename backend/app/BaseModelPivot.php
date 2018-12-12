<?php

namespace App;

use Illuminate\Database\Eloquent\Relations\Pivot;
use App\Traits\BaseModelTimezones;

class BaseModelPivot extends Pivot
{
    use BaseModelTimezones;
}
